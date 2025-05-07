'use server';
import prisma from "@/lib/prisma";
import {compareSync} from 'bcryptjs';
import {SignJWT} from 'jose';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LoginUser(currentState: any, formDataQuery:any){
    const username = formDataQuery.get("username");
    const password = formDataQuery.get("password");
    const message:any = {};
    if(!username || (username && username.length  < 2))
    {
        message.username = "Username field required";
        return {
            status: false,
            message
        }
    }

        if(!password || (password && password.length  < 2))
        {
            message.password = "Password field required";
            return {
                status: false,
                message
            }
        }

    
        const user = await prisma.users.findFirst({
            where:{
                username
            }
        });

        if(!user)
        {
            message.username = "Username does not exists";
        return {
            status: false,
            message
        }
        }


        if(!compareSync(password, user.password))
        {
            message.password = "Incorrect password";
            return {
                status: false,
                message
            }
        }


        const session =  await prisma.sessions.findFirst({
            where: {
                userId: user.id
            }
        });


        const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const alg = 'HS256'
        const jwt = await new SignJWT({userId: user.id}).setProtectedHeader({ alg }).setExpirationTime('2h').sign(JWT_SECRET);
        const cookieStore:any = cookies();
        cookieStore.set('access_key', jwt, {
        //   httpOnly: true, // Important to prevent client-side access
          maxAge: 7200,
          path: '/',
        //   sameSite: 'Strict', // Optional for extra security
        });


        if(session)
        {
            await prisma.sessions.update({
                data: {
                    session: jwt
                },
                where: {
                    id: session.id
                }
            });
        }else{
            await prisma.sessions.create({
                data: {
                    userId: user.id,
                    session: jwt,
                }
            });
        }
        // console.log("token", jwt);
        return redirect("/portal/dashboard");

}




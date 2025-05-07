'use server'
import prisma from "@/lib/prisma";
import { hashSync } from "bcryptjs";

export async function createuser(currentState:any,formDataQuery:any){
const username= formDataQuery.get("username");
const password =formDataQuery.get("password");
const confirmpassword =formDataQuery.get("confirmpassword");
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

    
        
        if(password !== confirmpassword ){
            return{error:"Confirm Password does not match"}
        }

        const user = await prisma.users.findFirst({
            where: { username }
        });
    
        if (user) {
            message.username = "Username already exists.";
            return {
                status: false,
                message
            };
        }
        const save = await prisma.users.create({
            data:{
                username,
                password: hashSync(password)
            },
            
        });
        if(save){
            return{message:"User created successfully!"}
        }
}
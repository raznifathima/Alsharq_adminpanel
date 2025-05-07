

'use server'
import prisma from "@/lib/prisma";
import {  hashSync } from "bcryptjs";

export async function Updateuser(currentState:any,formDataQuery:any){
   
    const idString = formDataQuery.get("id");
    const id = Number(idString);
const username= formDataQuery.get("username");
const password =formDataQuery.get("password");
const confirmpassword =formDataQuery.get("confirmpassword");
const message:any = {};
console.log("Updating user with ID:", id);
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
        let where:any = {
           username: username
        };

        if(id)
            {
                where = {
                    username: username,
                    NOT: {
                        id: id
                    } 
                }
            }
        const users  = await prisma.users.findFirst({
            where: where
        });
    
        if(users)
        {
            return {status: false, message: "User already exists"}
        }
        let save:any = null;
    
       if(id){
            save = await prisma.users.update({
                where: { id },
                data: {
                     username,
                  password:   hashSync(password)
                },
                
            });
        }
        if(save){
            return{message:"User updated successfully!"}
        }
        return{}
}
'use server'
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { compareSync, hashSync } from "bcryptjs";

export async function savePassword(currentState:any, formDataQuery:any){
const cookieStore:any = await cookies();
const token =cookieStore.get("access_key");

if(!token){
    return {error: "Unauthorized"};
}



const session = await prisma.sessions.findFirst({
    where: {
        session: token.value
    }
});

if(!session)
{
    return {error: "Unauthorized"};
}

const userId = session.userId;
const oldPassword =formDataQuery.get("currentpassword");
const newPassword = formDataQuery.get("newpassword");
const confirmPassword=formDataQuery.get("confirmpassword");

const user =await prisma.users.findUnique({
    where:{
        id:userId
    }
});

if(!compareSync(oldPassword,user.password)){
    return{error:"Incorrect Password"}
}

if(newPassword !== confirmPassword ){
    return{error:"Confirm Password does not match"}
}
if (newPassword.length < 6) {
    return { error: "Password must be at least 6 characters long" };
}
const save = await prisma.users.update({
    data:{
        password: hashSync(newPassword)
    },
    where:{
        id:userId
    }
});
if(save){
    return{message:"Password updated successfully!"}
}

}
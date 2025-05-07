import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:any, {params}:any){
    const param = await params;
    const {id} = param;
    console.log("ID:", id); 

    const users = await prisma.users.findUnique({
        select:{
            id: true,
            username: true,
        },
        where: {
            id: Number(id)
        }
    });

    return NextResponse.json({status: true, data: users});
}



export async function DELETE(req: Request, { params }:any) {
  const { id } =await params;

 // try {
   
    const deleteUser = await prisma.users.delete({
      where: {
        id: Number(id),
      },
    });

 
    return NextResponse.json({ status: true, message: 'User deleted successfully',data:deleteUser });
 // } catch (error) {
 
  //  return NextResponse.json({ status: false, message: 'User could not be deleted' });
 // }
}
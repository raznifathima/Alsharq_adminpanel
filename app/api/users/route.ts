

import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(req:any){
    const users = await prisma.users.findMany({
        select: {
          id: true,
            username: true,
        }
    });

    return NextResponse.json({data: users});
}
export async function DELETE(req: Request, { params }:any) {
  const { id } =await params;

  //try {
   
    const deletedCategory = await prisma.users.delete({
      where: {
        id: Number(id),
      },
    });

 
    return NextResponse.json({ status: true, message: 'User deleted successfully',data:deletedCategory });
 // } catch (error:any) {
 
   // return NextResponse.json({ status: false, message: 'User could not be deleted',error:error.message ,});
 // }
}
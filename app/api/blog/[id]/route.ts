import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function  GET(req:any,{params}:any){
    const param = await params;
    const {id} = param;

    const blog= await prisma.blogs.findUnique({
        select:{
            id:true,
            title:true,
            author:true,
            body:true,
            moderator:true,
            publish_on :true,
        },
        where:{
            id:Number(id)
        }
    })
    return NextResponse.json({status:true,data:blog});
}

export async function DELETE(req: Request, { params }:any ) {
    const { id } =await params;
  
    //try {
     
      const deletedCategory = await prisma.blogs.delete({
        where: {
          id: Number(id),
        },
      });
  
   
      return NextResponse.json({ status: true, message: 'Blog deleted successfully' ,data:deletedCategory});
   // } catch (error) {
   
      return NextResponse.json({ status: false, message: 'Blog could not be deleted' });
   // }
  }
  
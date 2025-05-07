'use server'

import prisma from "@/lib/prisma"

import { NextResponse } from "next/server";



export async function GET(req:any, {params}:any){
    const param = await params;
    const {id} = param;
    const blog = await prisma.blogs.findFirst({
        select:{
           id:true,
           title:true,
           author:true,
           publish_on:true,
           body:true,
        },
        where:{
            status:true,
            id: Number(id)
        }
    });
   if(!blog)
   {
    return NextResponse.json({
        status: false
    }, {status: 404});
   }
const store={
    id: blog.id ?? 0,
    title:blog.title,
    author:blog.author,
    body:blog.body,
    publish_on:blog.publish_on
};

    return NextResponse.json({
        status: true,
        data : store
    });
}
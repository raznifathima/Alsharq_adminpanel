'use server'

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req:any){

    const cookie:any = await cookies();
    const token = cookie.value;

    const session = await prisma.sessions.findFirst({
        where: {
            session: token
        }
    });

    if(!session)
    {
        return NextResponse.json({ status: false, message: "Unauthorized" }, {status: 401});
    }

    const blogs = await prisma.blogs.findMany({
    select:{
        id:true,
        title:true,
    }
    })
    return NextResponse.json({status:true,data:blogs});
}
export async function POST(req:any){

}
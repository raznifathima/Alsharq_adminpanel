import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:any, {params}:any){
    const param = await params;
    const {id} = param;

    const category = await prisma.categories.findUnique({
        select:{
            id: true,
            title: true,
        },
        where: {
            id: Number(id)
        }
    });

    return NextResponse.json({status: true, data: category});
}




'use server'

import prisma from "@/lib/prisma"
import { extractKeywords } from "@/utils/helper";
import { NextResponse } from "next/server";


export async function GET(req:any) {
    const blogs = await prisma.blogs.findMany({
        select: {
            id: true,
            title: true,
            author:true,
            publish_on: true,
            body: true,
        },
        where: {
            status: true
        }
    });
    const data:any = [];
    blogs.forEach((item:any) => { 
        const store = {
            id: item.id,
            title: item.title,
            author: item.author,
            body: extractKeywords(item.body, 10),
            publish_on: item.publish_on
        };
        data.push(store);
     });
    return NextResponse.json({
        status: true,
        data
    });
}
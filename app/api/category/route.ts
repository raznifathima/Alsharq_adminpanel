'use server'

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req:any){

    const categories = await prisma.categories.findMany({
        select: {
            id: true,
            title: true,
        }
    });

    return NextResponse.json({status: true, data: categories});
}


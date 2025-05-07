'use server'

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req:any){
    const cookieStore:any = await cookies();
    const token = cookieStore.get('access_key');
    const session = await prisma.sessions.findFirst({
        where: {
            session: token.value,
        }
    });

    if(session)
    {
        return NextResponse.json({status: true});
    }
    cookieStore.delete("access_key");
    return NextResponse.json({status: false});

}



import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req:any){
    const cookie = await cookies();
    const token:any = cookie.get("access_key");
    await prisma.sessions.deleteMany({
        where: {
            session: token.value
        }
    });
    cookie.delete("access_key");

    return NextResponse.json({status: true});
}
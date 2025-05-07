import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET_KEY;


const verifyToken = async (token:string) => {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
      return payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  };


  export async function middleware(request:any) {
    const cookieStore:any = await cookies();
    const token = cookieStore.get('access_key');
   
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  
    try {
      const data = await verifyToken(token.value);
      return NextResponse.next();
    } catch (error) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }



  export const config = {
    matcher: ['/portal/:path*'], // Protect specific routes 
  };
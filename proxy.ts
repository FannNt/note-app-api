import jwt from "jsonwebtoken";
import {NextRequest, NextResponse} from "next/server";

export function proxy(req: NextRequest){

    const path = req.nextUrl.pathname
    if(path ==='/api/user' && req.method === 'POST'){
        return NextResponse.next()
    }else if(path === "/api/user/login"){
        return NextResponse.next()
    }
    const token = req.headers.get('authorization')?.split(" ")[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        return NextResponse.next()
    }catch(e){
        return NextResponse.json({
            message: "token invalid"
        },{status: 401})
    }
}

export const config = {
    proxy : ['/api/:path*']
}
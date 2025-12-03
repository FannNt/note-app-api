import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/services/JWTService";

export function proxy(req: NextRequest){

    const path = req.nextUrl.pathname
    if(path ==='/api/user/register'){
        return NextResponse.next()
    }else if(path === "/api/user/login"){
        return NextResponse.next()
    }
    const token = req.headers.get('authorization')?.split(" ")[1];
    if (!token) {
        return NextResponse.json({
            'message': "unauthorized",
        },{status:401})
    }
    try {
        const user = verifyToken(token)

        const header = new Headers(req.headers)
         header.set('x-user', JSON.stringify(user))
        return NextResponse.next({
            request:{
                headers: header
            }
        })
    }catch(e){
        return NextResponse.json({
            message: "token invalid"
        },{status: 401})
    }
}

export const config = {
    proxy : ['/api/:path*']
}
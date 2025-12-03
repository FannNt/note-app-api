import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/services/JWTService";
import {prisma} from "@/db";

export async function GET(req: NextRequest, ) {
    const credential = getUser(req)

    const user = await prisma.user.findUnique({
        include: {
            note: {
                take: 5
            }
        },
        where: {id: credential.id}
    })

    if (!user) {
        return NextResponse.json({
           message: "user not found"
        },{status: 404,})
    }

    if (user.id != credential.id) {
        return NextResponse.json({
            message: "unauthorized",
        })
    }

    return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        note: user.note

    },{status:200})

}
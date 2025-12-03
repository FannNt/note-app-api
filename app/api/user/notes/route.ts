import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/services/JWTService";
import {prisma} from "@/db";

export async function GET(req: NextRequest) {
    const credential = getUser(req)

    if (!credential) {
        return NextResponse.json({
            message: "unauthorized"
        },{status:401})
    }

    const notes = await prisma.note.findMany({
        where: {created_by_id: credential.id}
    })


    return NextResponse.json(notes,{status:200})
}
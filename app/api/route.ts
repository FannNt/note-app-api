import {prisma} from "@/db";
import {z} from "zod";
import {NextResponse} from "next/server";
import {getUser} from "@/services/JWTService";

export async function GET() {
    const notes = await prisma.note.findMany({})

    return NextResponse.json(notes, {
        status: 200
    })
}


export async function POST(req: Request) {
    const Note = z.object({
        name: z.string(),
        message: z.string().min(5),
    });

    const user = getUser(req)
    const body = await req.json();
    const data = Note.safeParse(body)
    if (!data.success) {
        const error = z.flattenError(data.error)
        return NextResponse.json(error.fieldErrors, {status: 400})
    }
    const {message, name} = data.data

    const note = await prisma.note.create({
        data: {
            name: name,
            message: message,
            created_by_id: user.id
        }
    })

    return NextResponse.json(note, {
        status: 201
    })

}
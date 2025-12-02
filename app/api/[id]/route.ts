import {prisma} from "@/db";
import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";

export async function GET(req: NextRequest, {params}: {params: Promise<{id:number}>} ) {

    const id = Number((await params).id)
    const notes = await prisma.note.findFirstOrThrow({
        where: {id}
    })

    return new Response(JSON.stringify(notes), {
        status: 200
    })
}

export async function DELETE(req: NextRequest, {params}: { params: Promise<{ id: number }>}) {
    const id = Number((await params).id)

    const note = await prisma.note.delete({where: {id: id}})

    return NextResponse.json({"message": "Note deleted", note}, {status:200})
};

export async function PUT(req: NextRequest, {params}: {params: Promise<{id:number}>} ) {
    const Note = z.object({
        id: z.number(),
        name: z.string(),
        message: z.string().min(3)
    })
    const body = await req.json()
    const data = Note.safeParse({
        id:Number((await params).id),
        name: body.name,
        message: body.message,
    })
    if(!data.success) {
        const error = z.flattenError(data.error)
        return NextResponse.json(error.fieldErrors,{status:400})
    }
    const {id, name, message } = data.data
    const note = await prisma.note.update({
        data: {
            name,
            message
        },
        where: {id}
    })

    return NextResponse.json({note},{status:200})
}
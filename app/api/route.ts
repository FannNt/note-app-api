import {prisma} from "@/db";

export async function GET() {
    const notes = await prisma.note.findMany({})

    return new Response(JSON.stringify(notes), {
        status: 200
    })
}

export async function POST(req:Request) {
    const { name,message }= await req.json()

    const note = await prisma.note.create({
        data: {
            name: name,
            message: message,
        }
    })

    return new Response(JSON.stringify(note), {
        status: 201
    })

}
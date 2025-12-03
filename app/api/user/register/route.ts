import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import {prisma} from "@/db";
import {Prisma} from "@/app/generated/prisma/client";
import bcrypt from "bcrypt"
import {createToken} from "@/services/JWTService";



export async function POST(req: NextRequest) {
    const User= z.object({
        name: z.string().min(5),
        email: z.email(),
        password: z.string().min(5),
    })
    const body = await req.json()
    const data = User.safeParse(body)
    const {name, email, password}  = data.data
    if (!data.success) {
        const error = z.flattenError((data.error))

        return NextResponse.json(error.fieldErrors,{status: 400})
    }
    const encPass = await bcrypt.hash(password,10)
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: encPass,
            },
        })

        const token = createToken(user.id,user.email)

         return NextResponse.json({
             id: user.id,
             name: user.name,
             email: user.email,
             token
         },{status:201})
    }catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return NextResponse.json({
                    message: "email already use, try another email"
                }, {status: 400})
            }
        }else {
            return  NextResponse.json({
                message: `Server error ${err}`
            },{status:500})
        }
    }
}
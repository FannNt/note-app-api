import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import {prisma} from "@/db";
import bcrypt from "bcrypt";
import {createToken} from "@/services/JWTService";

export async function POST(req: NextRequest) {
    const loginScheme = z.object({
        email: z.string(),
        password: z.string()
    })
    const data = loginScheme.safeParse((await req.json()))
    if (!data.success) {
        const error = z.flattenError((data.error))

        return NextResponse.json({
            error
        },{status:400})
    }
    const {email, password} = data.data;
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    if(!user){
        return NextResponse.json({message: "password and email wrong"},{
            status: 400,
        })
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        return NextResponse.json({message: "password and email wrong"},{
            status: 400,
        })
    }
    const token = createToken(user.id,user.email)
    return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token
    }, {});

}
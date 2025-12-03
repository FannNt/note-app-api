import jwt from "jsonwebtoken";

export  function createToken(id:number, email:string){
    return jwt.sign({email,id}, process.env.JWT_SECRET_KEY!)
}
export function getUser(req: Request){
    const headers = req.headers.get('x-user');
    return headers ? JSON.parse(headers) : null

}

export function verifyToken(token:string){
    return jwt.verify(token, process.env.JWT_SECRET_KEY!)
}
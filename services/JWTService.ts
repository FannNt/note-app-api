import jwt from "jsonwebtoken";

export  function createToken(email:string){
    return jwt.sign(email, process.env.JWT_SECRET_KEY!)
}
export function getUserId(token:string){
    return jwt.decode(token)
}

export function verifyToken(token:string){
    return jwt.verify(token, process.env.JWT_SECRET_KEY!)
}
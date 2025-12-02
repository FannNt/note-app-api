import jwt from "jsonwebtoken";
export  function createToken(email){
    const token = jwt.sign(email,process.env.JWT_SECRET_KEY!);

    return token
}
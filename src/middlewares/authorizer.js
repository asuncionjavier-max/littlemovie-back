import { verify } from "../utils/jwt.js"

export default (req,res,next) =>{
const { access_token: accessToken } = req.cookies;

const user = verify(accessToken);

if(!user)
    return next({statusCode: 400, message: "No autenticado" })

const{ iat, exp, role, ...black } = user

console.log("> User", black);

res.locals = black

next();
};
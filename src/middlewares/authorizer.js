import { verify } from "../utils/jwt.js"

export default (req,res,next) =>{
const { access_token: accessToken } = req.cookies;

if (!accessToken) {
        return next({ statusCode: 401, message: "No autenticado" });
    }

const user = verify(accessToken);

if(!user)
    return next({statusCode: 401, message: "Vuelve a iniciar sesion" });

const{ email, role, id } = user;

res.locals = user;

next();
};
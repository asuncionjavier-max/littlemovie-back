import { verify } from '../utils/jwt.js'; // Ajusta tu ruta

export const requireAdmin = (req, res, next) => {
  const user = verify(req.cookies?.access_token);
  
  if (user?.role === 'admin') {
    req.user = user;
    return next();
  }

  return next({ statusCode: 403, message: 'Acceso denegado' });
};
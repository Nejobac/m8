import { jwt } from "jsonwebtoken";

export function verifyToken (req, res, next) {
    const {authorization} = req.headers
    
    let decoded;
    try {
      decoded = jwt.verify(authorization, process.env.SECRET_KEY)
    }
    catch(error) {
      console.log('error en la decodificacion', error)
      return res.status(400).json(error)
    }
    // Verificamos que el token aún no ha expirado
    const now = (new Date() / 1000)
    if (now > decoded.exp) {
      console.log({now}, {exp: decoded.exp})
      return res.status(401).json({
        err: 'Tu token expiró'
      })
    }
    // Guardamos el usuario en el objeto request
    req.data = decoded.data
    // Si está todo ok, procedemos con el camino tradicional
    next()
  }
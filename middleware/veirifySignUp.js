import { express } from "express";
import { jwt } from "jsonwebtoken";
const router = express.Router()
import bcrypt from ("bcrypt")

import User from "../models/users.model";


// Ruta para registrar un nuevo usuario
router.post("/login", async function (req, res) {
    const { email, password } = req.body;
  
  // Verificamos que el usuario exista en la "BBDD"
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ err: "Usuario inexistente" });
    }
  
  // Verificamos que la contraseña sea la correcta
    const repeatedPassword = await bcrypt.compare(password, user.password);
    if (!repeatedPassword) {
      return res.status(400).json({ err: "Contraseña incorrecta" });
    }
  
  // 3. Calculo 1 hora más
    const sessionExpired = Math.floor(new Date() / 1000) + 3600;
  
  // 4. Creo el token
    const token = jwt.sign(
      {
        exp: sessionExpired,
        data: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
        },
      },
      process.env.SECRET_KEY
    );
  
    // 4. Le retorno el token al cliente
    res.json(token);
  });
  
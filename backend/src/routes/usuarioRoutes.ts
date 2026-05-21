import { Router } from "express"; 
import { UsuarioController } from "../controllers/UsuarioController";
import { autenticar } from "../middlewares/auth";

import { upload } from "../config/multer";

const router = Router()
const usuarioController = new UsuarioController()

router.post('/cadastrar', upload.single('foto'), usuarioController.cadastrar.bind(usuarioController))
router.post('/login', usuarioController.login.bind(usuarioController))
router.put('/perfil/:id', autenticar, usuarioController.atualizarPerfil.bind(usuarioController))



export default router
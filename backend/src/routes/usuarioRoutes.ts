import { Router } from "express"; 
import { UsuarioController } from "../controllers/UsuarioController";
import { autenticar } from "../middlewares/auth";

import { upload } from "../config/multer";

const router = Router()
const usuarioController = new UsuarioController()

router.post('/cadastrar', upload.single('foto'), usuarioController.cadastrar)
router.post('/login', usuarioController.login)
router.put('/perfil/:id', autenticar, usuarioController.atualizarPerfil)



export default router
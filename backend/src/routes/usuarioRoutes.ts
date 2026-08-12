import { Router } from "express"; 
import { UsuarioController } from "../controllers/UsuarioController";
import { autenticar } from "../middlewares/auth";

import { upload } from "../config/multer";

const router = Router()
const usuarioController = new UsuarioController()

router.get('/lista-usuarios', usuarioController.listarUsuarios)
router.post('/cadastrar', upload.single('foto'), usuarioController.cadastrar.bind(usuarioController))
router.post('/login', usuarioController.login.bind(usuarioController))
router.patch('/perfil/:id', autenticar, usuarioController.atualizarPerfil.bind(usuarioController))
router.patch('/:id/foto', autenticar, upload.single('foto'), usuarioController.atualizarFoto.bind(usuarioController))




export default router
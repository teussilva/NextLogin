import { Router } from "express"; 
import { UsuarioController } from "../controllers/UsuarioController";
import { autenticar } from "../middlewares/auth";

const router = Router()
const usuarioController = new UsuarioController()

// router.get('/listar', usuarioController.listarUsuarios)
router.post('/cadastrar', usuarioController.cadastrar)
router.post('/login', usuarioController.login)
router.put('/perfil/:id', autenticar, usuarioController.atualizarPerfil)

export default router
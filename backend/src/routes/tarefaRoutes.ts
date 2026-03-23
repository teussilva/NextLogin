import { Router } from 'express'
import { TarefaController } from '../controllers/TarefaController'
import { autenticar } from '../middlewares/auth'

const router = Router()
const tarefaController = new TarefaController()

router.get('/list', autenticar, tarefaController.listar)
router.post('/criar', autenticar, tarefaController.criar)
router.put('/atualziar/:id', tarefaController.atualizar)
router.delete('/delete/:id', autenticar, tarefaController.excluir)

export default router
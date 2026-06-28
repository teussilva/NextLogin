import { Request, Response } from 'express'
import { Tarefa } from '../models/Tarefa'

export class TarefaController {

  async criar(req: Request, res: Response) {
    try {
      const { titulo, descricao, prioridade, status, data } = req.body
      const usuario_id = (req as any).usuario.id

      const tarefa = new Tarefa(titulo, prioridade, status, data, usuario_id, descricao)
      await tarefa.salvar()
      console.log({ mensagem: 'Tarefa criada com sucesso!'  })
      console.log(tarefa)
      return res.status(201).json({ mensagem: 'Tarefa criada com sucesso!' })
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const usuario_id = (req as any).usuario.id
      const tarefas = await Tarefa.buscarTodas(usuario_id)
      return res.status(200).json(tarefas)
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { titulo, descricao, prioridade, status, data } = req.body

      await Tarefa.atualizar(Number(id), titulo, descricao, prioridade, status, data)
      console.log({ mensagem: 'Tarefa atualizada com sucesso!' })
      console.log(req.body)
      return res.status(200).json({ mensagem: 'Tarefa atualizada com sucesso!' })
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
  }

  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.params
      await Tarefa.excluir(Number(id))
      console.log({ mensagem: 'Tarefa excluída com sucesso!' })
      return res.status(200).json({ mensagem: 'Tarefa excluída com sucesso!' })
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
  }
}
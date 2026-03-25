import { Request, Response } from 'express'
import { Usuario } from '../models/Usuario'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class UsuarioController {

  async cadastrar(req: Request, res: Response) {
    try {
      const { nome, email, senha, cargo } = req.body

      const usuarioExistente = await Usuario.buscarPorEmail(email)
      if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Email já cadastrado!' })
      }

      const foto = req.file ? req.file.filename : null
       console.log("Dados recebidos:", { nome, email,  foto});
      const senhaCriptografada = await bcrypt.hash(senha, 10)
      const usuario = new Usuario(nome, email, senhaCriptografada, foto, cargo)
      await usuario.salvar()

      return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' })
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body

      const usuario = await Usuario.buscarPorEmail(email)
      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado!' })
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
      if (!senhaCorreta) {
        return res.status(401).json({ mensagem: 'Senha incorreta!' })
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      )

      return res.status(200).json({
        mensagem: 'Login realizado com sucesso!',
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          foto: usuario.foto,
          cargo: usuario.cargo
        }
      })
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
  }

  async atualizarPerfil(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { nome, foto } = req.body

      await Usuario.atualizar(Number(id), nome, foto)

      return res.status(200).json({ mensagem: 'Perfil atualizado com sucesso!' })
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
  }
}


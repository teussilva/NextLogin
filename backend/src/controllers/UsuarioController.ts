import { Request, Response } from 'express'
import { Usuario } from '../models/Usuario'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class UsuarioController {
  async listarUsuarios(_req: Request, res: Response) {
    try {
      const listarTodosUsuarios = await Usuario.listarUsuarios()
      return res.status(200).json({
        usuarios: listarTodosUsuarios
      })
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro ao listar todos usuarios' })
    }
  }
  async cadastrar(req: Request, res: Response) {
    try {
      const { nome, email, senha, cargo } = req.body
      const usuarioExistente = await Usuario.buscarPorEmail(email)
      if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Email já cadastrado!' })
      }
      const foto = req.file ? req.file.filename : null
      const senhaCriptografada = await bcrypt.hash(senha, 10)
      const usuario = new Usuario(nome, email, senhaCriptografada, foto, cargo)
      await usuario.salvar()
      console.log(usuario)
      return res.status(201).json(
        { 
          mensagem: 'Usuário cadastrado com sucesso!',
          usuario: {
            nome,
            email,
            foto,
            cargo          
          }
        }
      )
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
        { expiresIn: '5h' }
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

 async atualizarFoto(req: Request, res: Response) {
    try {
        const { id } = req.params
        const foto = req.file ? req.file.filename : null
        if (!foto) {
            return res.status(400).json({ mensagem: 'Nenhuma foto enviada!' })
        }
        await Usuario.atualizarFoto(Number(id), foto)
        return res.status(200).json({ mensagem: 'Foto atualizada com sucesso!', foto })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

async atualizarPerfil(req: Request, res: Response) {
    try {
        console.log(req.body)

        const { id } = req.params
        const { nome, email, cargo, novaSenha } = req.body

        const senhaHash = novaSenha
            ? await bcrypt.hash(novaSenha, 10)
            : undefined

        await Usuario.atualizarPerfil(
            Number(id),
            nome,
            email,
            cargo,
            senhaHash
        )

        return res.status(200).json({
            mensagem: 'Perfil atualizado com sucesso!',
            usuario: {
              id: Number(id),
              nome,
              email,
              cargo
            }
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            mensagem: 'Erro interno do servidor'
        })
    }
  }
}


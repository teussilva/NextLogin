import request from 'supertest'
import { app } from '../app'
import 'dotenv/config'

describe('Login de usuário', () => {
  it('deve retornar um token JWT ao logar com credenciais válidas', async () => {
    const resposta = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: 'mh8093828@gmail.com',
        senha: '1234567890'
      })

    expect(resposta.status).toBe(200)
    expect(resposta.body).toHaveProperty('token')
  })

  it('deve retornar erro ao logar com senha errada', async () => {
    const resposta = await request(app)
      .post('/api/usuarios/login')
      .send({
        email: 'mh8093828@gmail.com',
        senha: '1234567890'
      })

    expect(resposta.status).toBe(401)
  })
})
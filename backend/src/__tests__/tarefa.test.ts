import request from 'supertest'
import { app } from '../app'
import 'dotenv/config'
import { PassThrough } from 'stream'

describe('Tarefas', () => {
    let token: string
    
    beforeAll(async () => {
        const resposta = await request(app)
            .post('/api/usuarios/login')
            .send({
                email: 'mh8093828@gmail.com',
                senha: '1234567890'
            })

        token = resposta.body.token
    })

    it('deve criar uma tarefa', async () => {
        const resposta = await request(app)
            .post('/api/tarefas/criar')
            .set('Authorization', `Bearer ${token}`)
            .send({
               Tarefas: {
                 titulo: 'Puxar dados da api',
                 descricao: 'Fazer requisao a APi the movies',
                 prioridade: 'Baixa',
                 status: 'Pendente',
                 data: '2026-09-16',
                 usuario_id: 10,
               }
            })

        expect(resposta.body.mensagem).toBe('Tarefa criada com sucesso!')
        expect(resposta.status).toBe(201)
    })
    it('deve listar as tarefas', async () => {
        const resposta = await request(app)
        .get('/api/tarefas/list')
        .set('Authorization', `Bearer ${token}`)

        expect(resposta.status).toBe(200)
    })
    it('deve atualizar uma tarefa', async () => {
        const resposta = await request(app)
        .post('/api/tarefas/atualizar')
        .set('Authorization', `Bearer ${token}`)
        .send({
            PassThrough
        })
    })
})
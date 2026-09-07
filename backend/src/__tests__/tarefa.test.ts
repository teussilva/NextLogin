import request from 'supertest'
import { app } from '../app'
import 'dotenv/config'

describe('Tarefas', () => {
    let token: string
    let tarefaId: number 
    beforeAll(async () => {
        const resposta = await request(app)
            .post('/api/usuarios/login')
            .send({ email: 'mh8093828@gmail.com', senha: '1234567890' })

        token = resposta.body.token
    })

    it('deve criar uma tarefa', async () => {
        const resposta = await request(app)
            .post('/api/tarefas/criar')
            .set('Authorization', `Bearer ${token}`)
            .send({
                titulo: 'Puxar dados da api',
                descricao: 'Fazer requisao a APi the movies',
                prioridade: 'Baixa',
                status: 'Pendente',
                data: '2026-09-16',
                usuario_id: 10,
            })

        expect(resposta.body.mensagem).toBe('Tarefa criada com sucesso!')
        expect(resposta.status).toBe(201)

        tarefaId = resposta.body.id 

        console.log('ID DA TAREFA:', resposta.body.id)
    })

    it('deve listar as tarefas', async () => {
        const resposta = await request(app)
            .get('/api/tarefas/list')
            .set('Authorization', `Bearer ${token}`)

        expect(resposta.status).toBe(200)
    })

    it('deve atualizar uma tarefa', async () => {
        const resposta = await request(app)
            .put(`/api/tarefas/atualizar/${tarefaId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: tarefaId,
                titulo: 'ddddddcccccccccccc',
                descricao: 'rrfffeefe',
                prioridade: 'baixa',
                status: 'Pendente',
                data: '2026-03-13'
            })

        expect(resposta.status).toBe(200)
    })

    it('deve deletar uma tarefa', async () => {
        const resposta = await request(app)
            .delete(`/api/tarefas/delete/${tarefaId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(resposta.status).toBe(200)
    })
})
import express from 'express'
import cors from 'cors'
import usuarioRoutes from './routes/usuarioRoutes'
import tarefaRoutes from './routes/tarefaRoutes'

export const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Authorization', 'Content-Type']              
}))

app.use(express.json())

app.use('/api/usuarios', usuarioRoutes)
app.use('/api/tarefas', tarefaRoutes)

app.use('/uploads', express.static('uploads'))



import { app } from "./app";

const serverPort = 3000

app.get('/', (req, res) =>{
    res.end('Bem vindo a api plataforma de freelancers')
})



app.listen(serverPort, () => console.log(`Servidor rodando na porta ${serverPort}`))
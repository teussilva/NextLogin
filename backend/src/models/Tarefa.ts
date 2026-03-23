import connection from "../database/connection";

export class Tarefa {
    id?: number
    titulo: string
    descricao?: string
    prioridade: string
    status: string
    data: string
    usuario_id: number

    constructor(titulo: string, prioridade: string, status: string, data: string, usuario_id: number, descricao?: string) {
        this.titulo = titulo
        this.descricao = descricao
        this.prioridade = prioridade
        this.status = status
        this.data = data
        this.usuario_id = usuario_id
    }

    async salvar() {
        const [result] = await connection.query(
            'INSERT INTO tarefas (titulo, descricao, prioridade, status, data, usuario_id) VALUES (?, ?, ?, ?, ?, ?)',
            [this.titulo, this.descricao, this.prioridade, this.status, this.data, this.usuario_id]
        )
        return result
    }

    static async buscarTodas(usuario_id: number) {
        const [rows] = await connection.query(
            'SELECT * FROM tarefas WHERE usuario_id = ?',
            [usuario_id]
        )
        return rows
    }

    static async buscarPorId(id: number) {
        const [rows] = await connection.query(
            'SELECT * FROM tarefas WHERE id = ?',
            [id]
        )
        return (rows as any[])[0]
    }

    static async atualizar(id: number, titulo: string, descricao: string, prioridade: string, status: string, data: string) {
        const [result] = await connection.query(
            'UPDATE tarefas SET titulo = ?, descricao = ?, prioridade = ?, status = ?, data = ? WHERE id = ?',
            [titulo, descricao, prioridade, status, data, id]
        )
        return result
    }

    static async excluir(id: number) {
        const [result] = await connection.query(
            'DELETE FROM tarefas WHERE id = ?',
            [id]
        )
        return result
    }
}
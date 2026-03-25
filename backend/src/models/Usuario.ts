import connection from "../database/connection";

export class Usuario {
    id?: number
    nome: string
    email: string
    senha: string
    foto?: string
    cargo?: string

    constructor(nome: string, email: string, senha: string, foto?: string, cargo?: string) {
        this.nome = nome
        this.email = email
        this.foto = foto
        this.senha = senha
        this.cargo = cargo
    }
    async salvar() {
        const [result] = await connection.query(
        'INSERT INTO usuarios (nome, email, senha, foto, cargo) VALUES (?, ?, ?, ?, ?)', 
        [this.nome, this.email, this.senha, this.foto, this.cargo]
       )
       return result
    }
    async listarUsuarios() {
        const [result] = await connection.query('SELECT * FROM usuarios')
        return result
    }
    static async buscarPorEmail(email: string) {
        const [rows] = await connection.query(
            'SELECT * FROM usuarios WHERE email = ?', 
            [email]
        )
        return (rows as any[])[0]
    }

     static async buscarPorId(id: number) {
        const [rows] = await connection.query(
            'SELECT * FROM usuarios WHERE id = ?', 
            [id]
        )
        return (rows as any[])[0]
    }

    static async atualizar(id: number, nome: string, foto?: string) {
        const [result] = await connection.query(
            'UPDATE usuarios SET nome = ?, foto = ? WHERE id = ?', 
            [nome, foto, id]
        )
        return result
    }

}
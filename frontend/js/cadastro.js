class Cadastro {
    constructor(nome, email, foto, senha, cargo) {
        this.nome = nome
        this.email = email
        this.foto = foto
        this.senha = senha
        this.cargo = cargo
    }
    validarCredenciais() {
        if (!this.nome || !this.email || !this.senha || !this.cargo) {
            alert('Por favor preencha todos os campos!')
            return false
        }

        if (!this.email.includes('@') || !this.email.includes('.')) {
            alert('Informe um email válido')
            return false
        }

        if (this.senha.length < 6) {
            alert(`${this.nome}, sua senha precisa ter no mínimo 6 caracteres`)
            return false
        }

        if (this.nome.length < 3) {
            alert('O nome deve ter no mínimo 3 caracteres')
            return false
        }

        if (this.cargo.length < 3) {
            alert('O cargo deve ter no mínimo 3 caracteres')
            return false
        }

        return true
    }

    validarFoto() {
        const tiposPermitidos = [
            'image/jpeg', 
            'image/png', 
            'image/jpg', 
            'image/gif', 
            'image/webp'
        ]
        if (!this.foto) {
            alert('Por favor selecione uma foto!')
            return false
        }
        if (!tiposPermitidos.includes(this.foto.type)) {
            alert('Formato inválido! Use JPG, PNG, GIF ou WEBP.')
            return false
        }
        if (this.foto.size > 20 * 1024 * 1024) {
            alert('A foto deve ter no máximo 20MB!')
            return false
        }
        return true
    }
}

const btnCadastrar = document.getElementById('btn-cadastrar')
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let cadastro_possuiError = false

const fetchCadastrarUsuario = async (formData) => {
    const msgElement = document.querySelector('#msg-usuario')
    try {
        const response = await fetch('http://127.0.0.1:3000/api/usuarios/cadastrar', {
            method: 'POST',
            mode: 'cors',
            body: formData
        })

        const dados = await response.json()

        if (!response.ok) {
            cadastro_possuiError = true
            document.getElementById('msg-usuario-cadastro').classList.add('active')
            document.getElementById('msg-usuario-cadastro').classList.add('warning')
            document.getElementById('msg-usuario-cadastro').textContent = dados.mensagem || 'Erro ao cadastrar!'
            return
        }

        if(response.ok) {
            cadastro_possuiError = false
            localStorage.setItem('usuario', JSON.stringify(dados.usuario))
            document.getElementById('msg-usuario-cadastro').classList.add('active')
             setTimeout(function (){
                  window.location = 'login.html'
             }, delay(400))
           
             return dados
        }
        
    } catch (error) {
        console.log('7 -ERRO NO CATCH')
        if (msgElement) {
            msgElement.classList.remove('hidden', 'correct')
            msgElement.classList.add('incorrect')
            msgElement.innerHTML = 'Não foi possível conectar ao servidor.'
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const form_Cadastro = document.querySelector('#formCadastro')

    if (!form_Cadastro) return

    form_Cadastro.addEventListener('submit', async (e) => {
        e.preventDefault()

        const nome = document.querySelector('#nome').value
        const email = document.querySelector('#email').value
        const foto = document.querySelector('#foto').files[0]
        const senha = document.querySelector('#senha').value
        const cargo = document.querySelector('#cargo').value

        const cadastroUsuario = new Cadastro(nome, email, foto, senha, cargo)

        if (!cadastroUsuario.validarCredenciais()) return
        if (!cadastroUsuario.validarFoto()) return

        const formData = new FormData()
        formData.append('nome', nome)
        formData.append('email', email)
        formData.append('foto', foto)
        formData.append('senha', senha)
        formData.append('cargo', cargo)

        btnCadastrar.disabled = true
        btnCadastrar.textContent ='Fazendo cadastro...'
        document.querySelector('.auth-content .auth-content-center .auth-form-cadastro form button').classList.add('cadastrando')
        await delay(8000)
        
        try {
            cadastro_possuiError ? document.getElementById('msg-usuario-cadastro').classList.remove('active') 
            : document.getElementById('msg-usuario-cadastro').classList.remove('active')
            const resultFetchCadastrarUsuario = await fetchCadastrarUsuario(formData)
            return resultFetchCadastrarUsuario
        } catch (error) {
            alert('Error ao tentar cadastrar usuario' + error)
            console.error(error)
        }finally {
            document.querySelector('.auth-content .auth-content-center .auth-form-cadastro form button').classList.remove('cadastrando')
            btnCadastrar.disabled = false
            btnCadastrar.textContent = 'Cadastrar'
        }
    })
})




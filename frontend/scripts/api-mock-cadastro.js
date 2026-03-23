class Cadastro {
    constructor(nome, email, photo, password) {
        this.nome = nome
        this.email = email
        this.photo = photo 
        this.password = password
    }
    validar() {
        if(!this.nome || !this.email || !this.photo || !this.password) {
         alert('Por favor preencha todos os campos!')
         return false
       }

      if(!this.email.includes('@') || !this.email.includes('.')) {
        alert('Informe um email válido')
        return false
      }

     if(this.password.length < 6) {
        alert(`${this.nome}, sua senha precisa ter no mínimo 6 caracteres`)
        return false
     }

     if(this.nome.length < 3) {
        alert('O nome deve ter no mínimo 3 caracteres')
        return false
     }

     return true
    }
    validarPhoto() {
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg']
        if(!tiposPermitidos.includes(this.photo.type)) {
            alert('Apenas imagens JPG e PNG são permitidas!')
            return false
        }
        const tamanhoMaximo = 2 * 1024 * 1024
        if(this.photo.size > tamanhoMaximo) {
            alert('A foto deve ter máximo 2MB!')
            return false
        }
        return true
    }
}

const form_Cadastro = document.querySelector('#formCadastro')

const fecthCadastrarUsuario = async (usuario) => {
    try {
        const response = await fetch('http://localhost:8080/api/usuarios/cadastrar', {
            method: 'POST',
            mode: 'cors',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(usuario)
        })

        const dados = await response.json()
        console.log(dados)
        return { dados }

    } catch (error) {
        console.log(error)
    }

}


form_Cadastro.addEventListener('submit', (e) => {
    e.preventDefault()
    const nome = document.querySelector('#nome').value
    const email = document.querySelector('#email').value
    const photo = document.querySelector('#foto').files[0]
    const password = document.querySelector('#senha').value
    
    const cadastroUsuario = new Cadastro(nome, email, photo, password)
    
    const valido = cadastroUsuario.validar()
    const fotoValida = cadastroUsuario.validarPhoto()
    
    if(valido && fotoValida) {
        const usuarioParaSalvar = {
            nome: cadastroUsuario.nome,
            email: cadastroUsuario.email,
            foto: cadastroUsuario.photo.name,
            senha: cadastroUsuario.password
        }

        fecthCadastrarUsuario(usuarioParaSalvar)
        
        e.target.reset()
       
        return true
    }
    return alert('usuario nao cadastrado')
})

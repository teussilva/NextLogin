class Cadastro {
    constructor(nome, email, foto, senha, cargo) {
        this.nome = nome
        this.email = email
        this.foto = foto 
        this.senha = senha
        this.cargo = cargo
    }
    validar() {
        if(!this.nome || !this.email || !this.foto || !this.senha) {
         alert('Por favor preencha todos os campos!')
         return false
       }

      if(!this.email.includes('@') || !this.email.includes('.')) {
        alert('Informe um email válido')
        return false
      }

     if(this.senha.length < 6) {
        alert(`${this.nome}, sua senha precisa ter no mínimo 6 caracteres`)
        return false
     }

     if(this.nome.length < 3) {
        alert('O nome deve ter no mínimo 3 caracteres')
        return false
     }
      if(this.cargo.length < 3) {
        alert('O cargo deve ter no mínimo 3 caracteres')
        return false
     }

     return true
    }
    validarPhoto() {
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg']
        if(!tiposPermitidos.includes(this.foto.type)) {
            alert('Apenas imagens JPG e PNG são permitidas!')
            return false
        }
        const tamanhoMaximo = 2 * 1024 * 1024
        if(this.foto.size > tamanhoMaximo) {
            alert('A foto deve ter máximo 2MB!')
            return false
        }
        return true
    }
}

const form_Cadastro = document.querySelector('#formCadastro')

const fecthCadastrarUsuario = async (formData) => {
        
        try {
        const response = await fetch('http://localhost:8080/api/usuarios/cadastrar', {
            method: 'POST',
            body: formData 
        });

        const dados = await response.json();

        if (!response.ok) {
            alert(dados.mensagem || 'Erro no cadastro');
            return;
        }

        if(response.ok) {
            const msgElement = document.querySelector('#msg-usuario');
            msgElement.classList.remove('hidden');
            msgElement.classList.add('correct');
            msgElement.innerHTML = dados.mensagem;
           setTimeout(() => {
            window.location.href = 'nextlogin-login.html'
           }, 1500)
            console.log("Sucesso:", dados);
            return
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
    }
}


form_Cadastro.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nome = document.querySelector('#nome').value
    const email = document.querySelector('#email').value
    const foto = document.querySelector('#foto').files[0]
    const senha = document.querySelector('#senha').value
    const cargo = document.querySelector('#cargo').value
    
    const cadastroUsuario = new Cadastro(nome, email, foto, senha, cargo)
    
    const valido = cadastroUsuario.validar()
    const fotoValida = cadastroUsuario.validarPhoto()
    
    if(valido && fotoValida) {
        const formData = new FormData()
        formData.append('nome', nome)
        formData.append('email', email)
        formData.append('foto', foto)
        formData.append('senha', senha)
        formData.append('cargo', cargo)
        await fecthCadastrarUsuario(formData)
        // e.target.reset()
        return true
    }
    return alert('usuario nao cadastrado')
})

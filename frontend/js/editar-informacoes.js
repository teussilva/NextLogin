const formPerfil = document.getElementById('form-perfil')
const input_perfilNome = document.getElementById('perfil-nome')
const input_perfilEmail = document.getElementById('perfil-email')
const select_perfilCargo = document.getElementById('perfil-cargo')
const input_perfilNovaSenha = document.getElementById('perfil-nova-senha')
const input_perfilConfirmarSenha = document.getElementById('perfil-confirmar-senha')

const fetchEditInformacoesPerfil = async (obj) => {
   const localstorage_usario = JSON.parse(localStorage.getItem('usuario'))
   let token = localStorage.getItem('token')
   try {
        const usuarioId = localstorage_usario.id
        const response = await fetch(`http://127.0.0.1:3000/api/usuarios/perfil/${usuarioId}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(obj)
        })

        const data = await response.json()
        if(response.ok) {
            const usuarioAtualizado = {
                ...localstorage_usario,
                nome: obj.nome,
                email: obj.email,
                cargo: obj.cargo
            }

            localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado))
            window.location.reload()
        }

    } catch (error) {
        alert('Error ao tentar editar as informações do perfil' + ' ' + error)
    }
}


const createObjInfoPerfil = (nome, email, cargo, novaSenha) => {
    let objInfoPerfil = {
        nome,
        email,
        cargo,
        novaSenha
    }
    fetchEditInformacoesPerfil(objInfoPerfil)
}

formPerfil.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const inputValuePerfilNome = input_perfilNome.value
    const inputValuePerfilEmail = input_perfilEmail.value 
    const inputValuePerfilCargo = select_perfilCargo.value
    const inputValuePerfilNovaSenha = input_perfilNovaSenha.value
    const inputValuePerfilConfirmarSenha = input_perfilConfirmarSenha.value

    if(
        inputValuePerfilNome === '' || 
        inputValuePerfilEmail === '' || 
        inputValuePerfilCargo === '' || 
        inputValuePerfilNovaSenha === '' || 
        inputValuePerfilConfirmarSenha === ''
    ) {
        return alert('Por favor preencher todos os campos!!')
    }

    if(inputValuePerfilNovaSenha !== inputValuePerfilConfirmarSenha) {
        alert('As senhas dos campos nao ocicidem')
        document.getElementById('btn-salvar-alteracao').classList.add('hidden-btn')
        return
    }
    if(inputValuePerfilNovaSenha === inputValuePerfilConfirmarSenha){
        document.getElementById('btn-salvar-alteracao').classList.remove('hidden-btn')
    }
    createObjInfoPerfil(inputValuePerfilNome, inputValuePerfilEmail, inputValuePerfilCargo, inputValuePerfilNovaSenha)
})

const div_content_perfil_foto = document.querySelector('.foto-perfil')

const mostrarFotoDePerfil = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario')) || {}
    try {
        let imgElement = document.createElement('img')
        imgElement.src = `http://localhost:3000/uploads/${usuario.foto}`
        imgElement.style.width = '100px'
        imgElement.style.height = '100px'
        imgElement.style.borderRadius = '50%'
        imgElement.style.objectFit = 'cover'        
        imgElement.style.objectPosition = 'center'
        imgElement.alt = 'Foto do usuário'
        div_content_perfil_foto.appendChild(imgElement)
        document.getElementById('nome-completo').textContent = `${usuario.nome}`
        document.getElementById('email-usuario').textContent = `${usuario.email}`
    } catch (error) {
         console.error('Erro ao processar dados:', error)
    }
}
mostrarFotoDePerfil()
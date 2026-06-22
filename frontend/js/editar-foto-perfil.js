addEventListener('DOMContentLoaded', () => {
    const inputFoto = document.querySelector('#input-foto')
    const div_content_perfil_foto = document.querySelector('.foto-perfil')
    const header_usuario_foto = document.querySelector('.header-container .header-info-usuario-foto')

    const validarArquivo = (arquivo) => {
        const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"]
        const tamanhoMaximo = 5 * 1024 * 1024

        if (!tiposPermitidos.includes(arquivo.type)) {
            alert("Formato inválido. Use JPG, PNG ou WEBP.")
            return false
        }

        if (arquivo.size > tamanhoMaximo) {
            alert("Arquivo muito grande. Máximo 5MB.")
            return false
        }

        return true
    }

    document.getElementById('form-foto').addEventListener('submit', async (e) => {
        e.preventDefault()
        const usuario = JSON.parse(localStorage.getItem('usuario')) || {}
        const { id } = usuario
        const formData = new FormData()
        formData.append('foto', inputFoto.files[0])

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://127.0.0.1:3000/api/usuarios/${id}/foto`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            })

            const data = await response.json()
            if (response.ok) {
                usuario.foto = data.foto
                localStorage.setItem('usuario', JSON.stringify(usuario))

                const novaUrl = `http://127.0.0.1:3000/uploads/${data.foto}`
                div_content_perfil_foto.querySelector('img').src = novaUrl
                header_usuario_foto.querySelector('img').src = novaUrl

                document.getElementById('btn-salvar-foto').style.display = 'none'
                document.getElementById('msg-foto-atualizada-perfil').classList.add('active')
            
            } else {
                alert(data.mensagem || 'Erro ao salvar foto.')
            }

        } catch (error) {
            console.log(error)
            alert('Erro de conexão.')
        }
    })

    inputFoto.addEventListener('change', () => {
        const foto = inputFoto.files[0]
        if (!foto) return
        if (!validarArquivo(foto)) return
        const urlTemporaria = URL.createObjectURL(foto)
        div_content_perfil_foto.querySelector('img').src = urlTemporaria
        header_usuario_foto.querySelector('img').src = urlTemporaria
        document.getElementById('btn-salvar-foto').style.display = 'block'
    })
})
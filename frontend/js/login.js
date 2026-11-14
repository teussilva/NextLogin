window.addEventListener('DOMContentLoaded', () => {
    const form_login = document.querySelector('#formLogin') || document.querySelector('form')
    const btnLogin = document.getElementById('btn-login')
    const msgElement = document.getElementById('msg-usuario-login')

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    
    if (!form_login || !btnLogin) {
        console.error('Formulário ou botão não encontrado. Confira os ids no HTML.')
        return
    }

    const mostrarMensagem = (texto, tipo = 'error') => {
        if (!msgElement) return
        msgElement.textContent = texto
        msgElement.classList.remove('sucesso', 'error', 'warning')
        msgElement.classList.add('active', tipo)
    }

    const limparMensagem = () => {
        if (!msgElement) return
        msgElement.textContent = ''
        msgElement.classList.remove('active', 'sucess', 'error', 'warning')
    }

    form_login.addEventListener('submit', async (e) => {
        e.preventDefault()
        limparMensagem()

        const email = document.querySelector('#email').value.trim()
        const senha = document.querySelector('#senha').value

        if (!email || !senha) {
            mostrarMensagem('Preencha email e senha!', 'warning')
            return
        }

        let redirecionando = false

        btnLogin.disabled = true
        btnLogin.textContent = 'Verificando Credenciais...'
        btnLogin.classList.add('logando')
        await new Promise(resolve => setTimeout(resolve, 2000))
        try {
            const response = await fetch('http://127.0.0.1:3000/api/usuarios/login', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            })

            const texto = await response.text()
            let dados
            try { dados = JSON.parse(texto) } catch { dados = { mensagem: texto } }
            console.log('STATUS:', response.status, dados)

            if (!response.ok) {
                mostrarMensagem(dados.mensagem || 'Erro no login', 'error')
                return
            }

            localStorage.setItem('token', dados.token)
            localStorage.setItem('usuario', JSON.stringify(dados.usuario))

          mostrarMensagem('🎉 Login realizado com sucesso!', 'success')
          redirecionando =  true
          setTimeout(() => {
            window.location.href = './dashboard.html'
          }, delay(800))

         

        } catch (error) {
            console.error('Erro de conexão:', error)
            mostrarMensagem('Não foi possível conectar ao servidor.')
        } finally {
            if (!redirecionando) {
                btnLogin.disabled = false
                btnLogin.textContent = 'Entrar'
                btnLogin.classList.remove('logando')
            }
        }
    })
})
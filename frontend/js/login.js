window.addEventListener('DOMContentLoaded', () => {
    const form_login = document.querySelector('#formLogin')

    if (form_login) {
        form_login.addEventListener('submit', async (e) => {
            e.preventDefault()

            const email = document.querySelector('#email').value
            const senha = document.querySelector('#senha').value

            try {
                const response = await fetch('http://127.0.0.1:3000/api/usuarios/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, senha })
                })

                const dados = await response.json()

                if (!response.ok) {
                    alert(dados.mensagem || 'Erro no login')
                    return
                }

                localStorage.setItem('token', dados.token)
                localStorage.setItem('usuario', JSON.stringify(dados.usuario))
                window.location.href = './dashboard.html'

            } catch (error) {
                console.error('Erro de conexão:', error)
                alert('Não foi possível conectar ao servidor.')
            }
        })
    }
})
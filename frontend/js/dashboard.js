const header_text_nome = document.querySelector('.header-container .header-info-text-nome')
const header_text_cargo = document.querySelector('.header-container .header-info-text-cargo')
const header_usuario_foto = document.querySelector('.header-container .header-info-usuario-foto')
const aside_nav_menu = document.querySelectorAll('.aside-menu nav ul li')
const sections = document.querySelectorAll('section')

aside_nav_menu.forEach(itemLi => {
    itemLi.addEventListener('click', () => {
        sections.forEach(section => {
            section.classList.add('hidden')
        })
        aside_nav_menu.forEach(li => {
            li.classList.remove('active')
        })
        sections.forEach(item => {
            if(itemLi.dataset.section === item.getAttribute('id')) {
                item.classList.remove('hidden')
                itemLi.classList.add('active')
            }
        })
    })
})


const setDadosPageDashboardHeader = (nome, cargo, foto) => {
    const usuario = JSON.parse(localStorage.getItem('usuario')) || {}
    if(usuario && usuario.nome) {
        try {
            const nomeSobrenome = usuario.nome.split(' ')
            const nomeFormatado = nomeSobrenome.length > 1 
                ? nomeSobrenome[0] + ' ' + nomeSobrenome[1]
                : nomeSobrenome[0]
            nome.textContent = nomeFormatado
            cargo.textContent = usuario.cargo || 'Sem cargo'
            if(usuario.foto) {
                let imgElement = document.createElement('img')
                imgElement.src = `http://localhost:3000/uploads/${usuario.foto}`
                imgElement.style.width = '50px'
                imgElement.style.height = '50px'
                imgElement.style.borderRadius = '50%'
                imgElement.style.objectFit = 'cover'        
                imgElement.style.objectPosition = 'center'
                imgElement.alt = 'Foto do usuário'
                foto.appendChild(imgElement)
            }
        } catch (error) {
            console.error('Erro ao processar dados:', error)
        }
    } else {
        console.warn('Usuário não encontrado no localStorage')
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setDadosPageDashboardHeader(header_text_nome, header_text_cargo, header_usuario_foto)
})

document.querySelector('#btn-logout').addEventListener('click', () => {
    let confirmarSaida = confirm('Tem certeza que deseja sair?')
    if(confirmarSaida) {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        window.location.href = './cadastro.html'
    }
})








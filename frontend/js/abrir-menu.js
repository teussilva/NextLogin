const dashboard_aside = document.querySelector('.dashboard-container-main .aside-menu')
const dashboard_main = document.querySelector('.dashboard-main-container')
const dashboard_header = document.querySelector('.header-content')

const btnAbrirMenuAside = document.querySelector('#btn-abrir-menu')

btnAbrirMenuAside.addEventListener('click', (e) => {
    const clickedElementButton = e.target

    console.log('clickou mas nao aconteceu nada ')
    if (clickedElementButton) {
        console.log('classe hidden e expand removida')
        dashboard_aside.classList.remove('hidden')
        dashboard_main.classList.remove('expand')
        dashboard_header.classList.remove('expand')
    } else {
        console.log('nao clickou no botao')
    }

})
const dashboardAside = document.querySelector('.dashboard-container-main .aside-menu')
const dashboardMain = document.querySelector('.dashboard-main-container')
const dashboardHeader = document.querySelector('.header-content')
const btnAbrirMenuAside = document.querySelector('#btn-abrir-menu')
if (btnAbrirMenuAside) {
    btnAbrirMenuAside.addEventListener('click', () => {
        dashboardAside?.classList.remove('hidden')
        dashboardMain?.classList.remove('expand')
        dashboardHeader?.classList.remove('expand')
    })
}
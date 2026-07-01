const dashboard_aside_2 = document.querySelector('.dashboard-container-main .aside-menu')
const dashboard_main_2 = document.querySelector('.dashboard-main-container')
const dashboard_header_2 = document.querySelector('.header-content')

document.querySelector('.btn-menu').addEventListener('click', () => {
    dashboard_aside_2.classList.remove('hidden')
    dashboard_main_2.classList.remove('expand')
    dashboard_header_2.classList.remove('expand')
    console.log(`jsjjs`)
});
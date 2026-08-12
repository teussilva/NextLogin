const dashboard_aside = document.querySelector('.dashboard-container-main .aside-menu')
const dashboard_main = document.querySelector('.dashboard-main-container')
const dashboard_header = document.querySelector('.header-content')

document.querySelector('.aside-btn-arrow-left').addEventListener('click', () => {
   dashboard_aside.classList.toggle('hidden')
   dashboard_main.classList.toggle('expand')
   dashboard_header.classList.toggle('expand')

   console.log('jsjjs')
})
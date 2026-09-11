const dashboard_aside = document.querySelector('.dashboard-container-main .aside-menu')
const dashboard_main = document.querySelector('.dashboard-main-container')
const dashboard_header = document.querySelector('.header-content')

const setCSSClassDashboard = (class_hidden, class_expand) => {
   dashboard_aside.classList.toggle(class_hidden)
   dashboard_main.classList.toggle(class_expand)
   dashboard_header.classList.toggle(class_expand)
}

document.querySelector('.aside-btn-arrow-left').addEventListener('click', () => {
   setCSSClassDashboard('hidden', 'expand', 'expand')
})
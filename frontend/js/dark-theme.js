let btnDarktTheme = document.querySelector('.btn-menu-dark-theme i');
let body = document.querySelector('#dashboard-body');
let aside = document.querySelector('.aside-menu');
let header = document.querySelector('.header-container');

window.addEventListener('DOMContentLoaded', () => {
    const tema = localStorage.getItem('darkTheme');
    if (tema === 'Escuro') {
        body.classList.add('dark-theme');
        aside.classList.add('dark-theme');
        header.classList.add('dark-theme');
        btnDarktTheme.className = 'fa-solid fa-sun';
    } else {
        btnDarktTheme.className = 'fa-solid fa-moon';
    }
})

btnDarktTheme.addEventListener('click', () => {
    const darkMode = body.classList.toggle('dark-theme')
    aside.classList.toggle('dark-theme', darkMode)
    header.classList.toggle('dark-theme', darkMode)
    if (darkMode) {
        btnDarktTheme.className = 'fa-solid fa-sun';
        localStorage.setItem('darkTheme', 'Escuro');
    } else {
        btnDarktTheme.className = 'fa-solid fa-moon';
        localStorage.setItem('darkTheme', 'Claro');
    }
});
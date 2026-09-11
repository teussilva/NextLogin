let btnDarktTheme = document.querySelector('.btn-menu-dark-theme i');
let body = document.querySelector('#dashboard-body');
let aside = document.querySelector('.aside-menu');
let header = document.querySelector('.header-container');


const setCSSClass = (valueClassBody, valueClassAside, valueClassHeader, valueClassBtnDarkTheme) => {
    const tema = localStorage.getItem('darkTheme');
    if (tema === 'Escuro') {
        body.classList.add(valueClassBody);
        aside.classList.add(valueClassAside);
        header.classList.add(valueClassHeader);
        btnDarktTheme.className = valueClassBtnDarkTheme ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setCSSClass('dark-theme', 'dark-theme', 'dark-theme', 'fa-solid fa-sun')
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
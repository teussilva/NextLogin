let btnDarktTheme = document.querySelector('.btn-menu-dark-theme i')
let body = document.querySelector('#dashboard-body')
let aside = document.querySelector('.aside-menu')
let header = document.querySelector('.header-container')

btnDarktTheme.addEventListener('click', () => {
    if(body.classList.toggle('dark-theme') && aside.classList.toggle('dark-theme') && header.classList.toggle('dark-theme')){
       btnDarktTheme.className = 'fa-solid fa-sun'
       localStorage.setItem('darkTheme', 'Escuro')
    }else{
        btnDarktTheme.className = 'fa-solid fa-moon'
        localStorage.setItem('darkTheme', 'Claro')
    }
})
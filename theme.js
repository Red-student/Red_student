/*
window.onload = onLoad;

function onLoad(){
    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme", 'light-theme')
    }
    let currentTheme = localStorage.getItem("theme")
    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';
    } else {
        document.body.className = 'light-theme';
    }
    document.getElementById('themeToggle').addEventListener('click', function () {
        const currentTheme = document.body.className;
        if (currentTheme === 'light-theme') {
            document.body.className = 'dark-theme';
        } else {
            document.body.className = 'light-theme';
        }
        localStorage.setItem("theme", currentTheme)
    });
}
*/
window.onload = function() {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", '');
    }
    let currentTheme = localStorage.getItem("theme");
    if (currentTheme === 'night-theme') {
        document.body.classList.add('night-theme');
    }

    document.getElementById('night-theme-button').addEventListener('click', function() {
        document.body.classList.toggle('night-theme');
        const theme = document.body.classList.contains('night-theme') ? 'night-theme' : '';
        localStorage.setItem("theme", theme);
    });
};
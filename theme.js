
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


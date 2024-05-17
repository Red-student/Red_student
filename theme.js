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
const nightThemeButton = document.getElementById("night-theme-button")

nightThemeButton.addEventListener("click", function () {
    document.body.classList.toggle("night-theme")

    const theme = localStorage.getItem("theme")

    if (theme == "night-theme") {
        localStorage.setItem("theme", "")
    } else {
        localStorage.setItem("theme", "night-theme")
    }
})
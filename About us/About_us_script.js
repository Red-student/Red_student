// Данные для создания круговой диаграммы
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Седаны', 'Внедорожники', 'Минивэны', 'Кроссоверы', 'Пикапы', 'Другое'],
        datasets: [{
            label: 'Распределение автомобилей по типам %',
            data: [20, 15, 10, 15, 5, 35],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(128, 128, 128, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(128, 128, 128, 1)'
            ],
            borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true
        }
});
// Опции для диаграммы
var options = {
    animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
    },
    tooltips: {
        mode: 'index',
        intersect: false
    },
};

// Получаем контекст элемента canvas
var ctx = document.getElementById('myChart').getContext('2d');

// Создаем круговую диаграмму
var myChart = new Chart(ctx, {
    type: 'bar', 
    data: data,
    options: options
});



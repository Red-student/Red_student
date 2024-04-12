// Данные для создания круговой диаграммы
var data = {
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
};
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
    type: 'pie', 
    data: data,
    options: options
});

// Создаем карту Leaflet
var map = L.map('map', {
    center: [53, 70], 
    zoom: 6,
    maxBounds: [
        [48, 60], 
        [58, 80]  
    ]
});

// Добавляем слой OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    noWrap: true
}).addTo(map);

// Данные о регионах
var regionsData = [
    { name: "Павлодар", coords: [52.3, 76.95], info: ["Авто в наличии: 600", "Персонал: 40 человек", "Время работы: 9:00-18:00", "Телефон: +7 (905) 123-45-67"] },
    { name: "Астана", coords: [51.1694, 71.4491], info: ["Авто в наличии: 50000", "Персонал: 5000 человек", "Время работы: 6:00-18:00", "Телефон: +7 (916) 234-56-78"] },
    { name: "Кокшетау", coords: [53.2835, 69.3841], info: ["Авто в наличии: 60", "Персонал: 5 человек", "Время работы: 12:00-21:00", "Телефон: +7 (701) 345-67-89"] },
    { name: "Костанай", coords: [53.2, 63.6], info: ["Авто в наличии: 7500", "Персонал: 100 человек", "Время работы: 9:00-18:00", "Телефон: +7 (902) 456-78-90"] },
    { name: "Петропавловск", coords: [54.8785, 69.1334], info: ["Авто в наличии: 6000", "Персонал: 85 человек", "Время работы: 6:00-00:00", "Телефон: +7 (905) 457-89-75"] }
];

// Для каждого региона создаем маркер
regionsData.forEach(function(region) {
    var infoHtml = region.info.map(function(info) {
        return `<p>${info}</p>`;
    }).join('');

    var popupHtml = `<div class="popup-info">${infoHtml}</div>`;

    var marker = L.marker(region.coords).addTo(map)
    .bindPopup(popupHtml)
    .on('mouseover', function() {
        marker.getElement().classList.add('highlighted'); 
        this.openPopup();
    })
    .on('mouseout', function() {
        marker.getElement().classList.remove('highlighted'); 
        this.closePopup();
    });
});

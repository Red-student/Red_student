//Функция которая заменяет текст на картинку
$(document).ready(function() {
// Функция, которая будет выполнена, когда весь HTML документ будет загружен и готов к работе
    $('.keyword').each(function() {
// Для каждого элемента с классом "keyword" выполняется следующая функция
      let originalText = $(this).html();
      let map = {
        'кот': '../img/cat_mouse.png'
      };
// Функция для замены ключевых слов из объекта map на соответствующие изображения
      const replace = (text, map) => {
        return text.replace(new RegExp(Object.keys(map).join('|'), 'gi'), function(matched) {
          return '<img src="' + map[matched.toLowerCase()] + '" alt="' + matched + '" style="max-width: 7.5%; height: auto;" />';
        });
      };
// Обработчик события "mouseenter" (наведение курсора на элемент)
      $(this).mouseenter(function() {
        $(this).html(replace(originalText, map));
      });
// Обработчик события "mouseleave" (убирание курсора с элемента)
      $(this).mouseleave(function() {
        $(this).html(originalText);
      });
    });
  });
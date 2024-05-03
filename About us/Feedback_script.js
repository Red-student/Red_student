//Функция открытия определенной страницы в новом окне
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('openWindowLink').addEventListener('click', function (event) {
    // При нажатии на элемент с id "openWindowLink" выполняется следующая функция
    event.preventDefault();
    window.open('About_us.html', 'Новое окно', 'width=700,height=600');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Функция обработчика события для ввода телефонного номера
  var phoneInputCallback = function (event) {
    var el = event.target,
      clearVal = el.dataset.phoneClear,
      pattern = el.dataset.phonePattern,
      matrix_def = "+7 (___) ___-__-__",
      matrix = pattern ? pattern : matrix_def,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = event.target.value.replace(/\D/g, "");
    // проверяем длину значения и очищаем поле, если оно неполное
    if (clearVal !== 'false' && event.type === 'blur') {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        event.target.value = '';
        return;
      }
    }
    // Заменяем символы ввода на шаблон телефонного номера
    if (def.length >= val.length) val = def;
    event.target.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
  };

  // Получаем все элементы с атрибутом data-phone-pattern
  var phoneInputs = document.querySelectorAll('[data-phone-pattern]');
  for (let elem of phoneInputs) {
    for (let ev of ['input', 'blur', 'focus']) {
      elem.addEventListener(ev, phoneInputCallback);
    }
  }

  // Обработчик отправки формы
  document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Получаем значения полей формы
    var username = document.getElementById('username').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;
    var captcha = document.getElementById('captcha').value;
    var consent = document.getElementById('consent').checked;

    // Проверяем заполнение всех обязательных полей и капчи
    if (!username || !phone || !message || !captcha || !consent) {
      displayErrorMessage('Пожалуйста, заполните все поля и введите капчу.');
      return;
    }

    // Проверяем длину сообщения
    if (message.length > 450) {
      displayErrorMessage('Длина сообщения не должна превышать 450 символов.');
      return;
    }

    // Проверяем капчу
    if (parseInt(captcha) !== 8) {
      displayErrorMessage('Неверная капча. Пожалуйста, решите 5 + 3.');
      return;
    }

    // Получаем текущую историю из локального хранилища (если есть)
    var history = localStorage.getItem('feedbackHistory');

    // Создаем новую запись для истории
    var entry = username + ', ' + phone + ', ' + message + '\n';

    // Обновляем историю с новой записью
    if (history) {
      history += entry;
    } else {
      history = entry;
    }

    // Сохраняем историю в локальное хранилище
    localStorage.setItem('feedbackHistory', history);

    // Очищаем поля формы после отправки
    document.getElementById('username').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
    document.getElementById('captcha').value = '';
    document.getElementById('consent').checked = false;

    // Очищаем сообщения об ошибках
    clearErrorMessages();
  });

  // Обработчик для кнопки отображения истории
  document.getElementById('toggle-history-btn').addEventListener('click', function () {
    var historyDiv = document.getElementById('history');

    // Получаем текущее состояние отображения истории
    var isHistoryVisible = historyDiv.style.display === 'block';

    if (!isHistoryVisible) {
      // Получаем историю из локального хранилища
      var history = localStorage.getItem('feedbackHistory');

      // Если история есть, отображаем ее
      if (history) {
        // Вставляем историю в элемент с id="history"
        historyDiv.innerText = history;
        // Показываем элемент с историей
        historyDiv.style.display = 'block';
      } else {
        historyDiv.innerText = 'No feedback history yet.';
      }
    } else {
      // Скрываем историю
      historyDiv.style.display = 'none';
    }
  });

  // Функция для отображения сообщений об ошибках
  function displayErrorMessage(message) {
    var errorMessagesDiv = document.getElementById('error-messages');
    errorMessagesDiv.innerText = message;
    errorMessagesDiv.style.display = 'block';
  }

  // Функция для очистки сообщений об ошибках
  function clearErrorMessages() {
    var errorMessagesDiv = document.getElementById('error-messages');
    errorMessagesDiv.innerText = '';
    errorMessagesDiv.style.display = 'none';
  }
});
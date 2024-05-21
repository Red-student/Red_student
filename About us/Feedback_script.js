
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

    // Получаем значения полей формы и проверяем наличие ошибок
    var username = document.getElementById('username').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;
    var captcha = document.getElementById('captcha').value;
    var consent = document.getElementById('consent').checked;

    var errorMessage = '';

    // Проверка наличия ошибок
    if (!username) {
      errorMessage += 'Пожалуйста, введите ваше имя.\n';
    }

    if (!phone) {
      errorMessage += 'Пожалуйста, введите ваш номер телефона.\n';
      displayErrorMessage('Пожалуйста, введите ваш номер телефона.', 'captcha');
    }

    if (!message) {
      errorMessage += 'Пожалуйста, введите ваше сообщение.\n';
    }

    if (!captcha || parseInt(captcha) !== 8) {
      errorMessage += 'Неверная капча. Пожалуйста, решите 5 + 3.\n';
      displayErrorMessage('Неверная капча. Пожалуйста, решите 5 + 3.', 'captcha');
    }

    if (!consent) {
      errorMessage += 'Для отправки формы необходимо дать согласие на обработку персональных данных.\n';
    }

    // Если есть ошибки, выводим их
    if (errorMessage) {
      displayErrorMessage(errorMessage);
      return;
    }

    // Если ошибок нет, отправляем форму и очищаем поля
    var history = localStorage.getItem('feedbackHistory');
    var entry = username + ', ' + phone + ', ' + message + '\n';
    if (history) {
      history += entry;
    } else {
      history = entry;
    }
    localStorage.setItem('feedbackHistory', history);
    document.getElementById('username').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
    document.getElementById('captcha').value = '';
    document.getElementById('consent').checked = false;
    clearErrorMessages();
  });

  // Функция для отображения сообщений об ошибках
  function displayErrorMessage(message, inputId) {
    var errorMessagesDiv = document.getElementById('error-messages');
    errorMessagesDiv.innerText = message;

    // Если есть ID поля ввода, выводим сообщение об ошибке в это поле
    if (inputId) {
      var inputField = document.getElementById(inputId);
      inputField.setCustomValidity(message);
      inputField.reportValidity();

      // Очищаем сообщение об ошибке капчи, если переданное сообщение соответствует капче
      if (inputId === 'captcha') {
        clearCaptchaError();
      }
    }
  }
  // Функция для отображения сообщений об ошибках
  function displayErrorMessage(message) {
    var errorMessagesDiv = document.getElementById('error-messages');
    errorMessagesDiv.innerText = message;
    errorMessagesDiv.classList.remove('hidden'); // Удаляем класс 'hidden', чтобы отобразить сообщение об ошибке
  }

  // Функция для очистки сообщений об ошибках
  function clearErrorMessages() {
    var errorMessagesDiv = document.getElementById('error-messages');
    errorMessagesDiv.innerText = '';
    errorMessagesDiv.classList.add('hidden'); // Добавляем класс 'hidden', чтобы скрыть сообщение об ошибке
  }
  // Функция для очистки сообщения об ошибке капчи
  function clearCaptchaError() {
    var captchaInput = document.getElementById('captcha');
    captchaInput.setCustomValidity('');
  }
});
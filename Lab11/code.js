function calculateSum() {
    var inputValue = document.getElementById("number_input").value;
    var n = parseInt(inputValue);
    var sum = 0;

    if (inputValue.includes(".") || inputValue.includes(",")) {
        document.getElementById("result").innerHTML = "<p>Пожалуйста, введите целое число без десятичной точки или запятой.</p>";
        return;
    }

    if (n < 1 || isNaN(n)) {
        document.getElementById("result").innerHTML = "<p>Пожалуйста, введите целое число n, которое больше или равно 1.</p>";
        return;
    }

    for (var i = 1; i <= n; i++) {
        sum += 1 / Math.pow(i, 2);
    }

    document.getElementById("result").innerHTML = "<p>Сумма ∑(i=1 до " + n + ") 1/i^2 = " + sum.toFixed(6) + "</p>";
}
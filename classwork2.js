
// ######################
// код, который мы избавили от зависимостей от console.log
// и починили в нём баг, доверевшись регрессионному тесту
// ######################
function ScanBarCode(barcode, display_method) {
    if (barcode == "11333") {
        var cost = 100;
        var item = 'milk';
    }
    if (barcode == "11233") {
        var cost = 30;
        var item = 'cheese';
    }
    var tax = 0.05;

    if (item == 'cheese') {
        tax = 0.07;
    }
    cost = cost * (1 + tax);

    //мы отрефакторили код так, чтобы это место стало швом
    //теперь мы можем менять его поведение, не меняя сам код
    display_method(item + " cost: ");
    display_method(cost + "$ tax included")
}

// ######################
// Вынесение зависимости от низкоуровнего кода
// ######################

//функция с низкоуровневым кодом, которая будет использоваться для настоящей программы
function display(line) {
    console.log(line);
}

//Fake-объект, который будет использоваться для тестов
function createDisplay() {
    var last_line = "";

    return {
        display: memory_display,
        last_line: get_least_line
    };

    function memory_display(line){
        last_line = line;
    }

    function get_least_line() {
        return last_line;
    }
}
//Fake-объект, создаём для тестов
var memoryDisplay = createDisplay();

// ######################
// Элементарные тесты, которые мы изобрели на коленке
// ######################

// Arrange
// предусловия, настройка
var barcode = "11333";

// Act
// действие, одно, конкретное
ScanBarCode(barcode, memoryDisplay.display);

// Assert
// проверка результата
if (memoryDisplay.last_line() != "105$ tax included"){
    console.log("ERROR!!!");
} else
{
    console.log("SUCCESS!!!");
}

// Arrange
// предусловия, настройка
var barcode = "11233";

// Act
// действие, одно, конкретное
ScanBarCode(barcode, memoryDisplay.display);

// Assert
// проверка результата
if (memoryDisplay.last_line() != "32.1$ tax included"){
    console.log("ERROR!!!");
    console.log(memoryDisplay.last_line() );
} else
{
    console.log("SUCCESS!!!");
}

// ######################
//Код, который останется в коде настоящей программы
// ######################
ScanBarCode("11233", display);
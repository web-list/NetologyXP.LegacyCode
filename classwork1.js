
// глобальные методы, нужны, чтобы сделать код работоспособным
function PostRecieveError() {
    console.log('hello');
    //...
}
function getMutex() {
    return {Unlock : function() { }};
}

function FreeLibrary() {

}

// метод, который подменяет PostRecieveError
var getPostRecieveErrorMethod = function (isTesting) {
    if (isTesting) {
        return function () {
            console.log('test');
        }
    }
    return PostRecieveError;
};

function CreateNetwork(isTesting) {
    //----------------
    // мы добавили кусок кода, который сработает только в случае тестирования
    // воспользовавшись швом, мы изменили поведение метода InitNetwork
    // будет выполнена локальная функция PostRecieveError, так как она перекроет глобальную
    var PostRecieveError = getPostRecieveErrorMethod(isTesting);
    //----------------

    var serialized = false;
    var failureSent = false;
    var mutex = getMutex();
    var refCount = 0;
    var SOCKETCALLBACK = function() {};

    return {
        init: InitNetwork
    };

    function InitNetwork() {
        if (serialized) {
            return true;
        }
        mutex.Unlock();
        refCount++;

        serialized = true;
        FreeLibrary();
        //...
        if (!failureSent) {
            failureSent = true;
            // Это место - пример шва, мы можем изменить поведение в этом месте программы,
            // не меняя код метода InitNetwork
            // таким образом мы сможем протестировать его, будучи уверенными, что его поведение не поменялось
            PostRecieveError(SOCKETCALLBACK);
        }
        //...
    }
};

//Тестовый вызов
CreateNetwork(true).init();
//Настоящий вызов
CreateNetwork(false).init();
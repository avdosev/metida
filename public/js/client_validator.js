console.log("SOSU")

const emailRow = document.getElementsByName("email")
const passwordRow = document.getElementsByName("password")
document.addEventListener('submit', (event) => {
    const email = emailRow[0].value
    const password = passwordRow[0].value
    var next = false;
    console.log(!!email.match("^([\\w-]+\\.)*[\\w-]+\\@\\w+\\.\\w+$")) //истинное значение функции
    console.log(!!password.match(".{5,}"))

    function validation() {
        if ( !!email.exec("^([\\w-]+\\.)*[\\w-]+\\@\\w+\\.\\w+$") )
            return false
        //я бля аутирую
        if ( !!password.match(".{5,}"))
            return false


            return true
    }
    console.log("validation " + !!validation)
    //if (!validation)
        //event.preventDefault() //если не пускать пользователя дальше, то вызываем это

})

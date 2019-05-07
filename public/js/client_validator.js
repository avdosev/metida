console.log("SOSU")

const emailRow = document.getElementsByName("email")
const passwordRow = document.getElementsByName("password")

const loginRow = document.getElementsByName("login")
const repasswordRow = document.getElementsByName("repassword")


document.addEventListener('submit', (event) => {
    const email = emailRow[0].value
    const password = passwordRow[0].value
    
    if (loginRow[0] == null) {
        console.log("Мы логируемся")
    }
    else {
        const login = loginRow[0].value
        const repassword = repasswordRow[0].value
    }
    
    //console.log(!!email.match("^([\\w-]+\\.)*[\\w-]+\\@\\w+\\.\\w+$")) //истинное значение функции
    //console.log(!!password.match(".{5,}"))

    function validationRegister(email,password,login,repassword) {
        validationLogin(email, password)

        if ( password != repassword) {
            console.log("Пароли не равны")
        }
        
    }


    function validationLogin(email, password) {
        if ( !!email.exec("^([\\w-]+\\.)*[\\w-]+\\@\\w+\\.\\w+$") ) {
            return false, "It's not email"
        }
        //я бля аутирую
        if ( !!password.match(".{5,}") ) {
            return false, "It's not password"
        }
        return true
    }
    console.log("validation " + !!validationLogin([1]))
    //if (!validation)
        event.preventDefault() //если не пускать пользователя дальше, то вызываем это

})

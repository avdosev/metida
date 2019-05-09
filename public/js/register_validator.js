console.log("SOSU")

const loginRow = document.getElementsByName("login")
const repasswordRow = document.getElementsByName("repassword")
const emailRow = document.getElementsByName("email")
const passwordRow = document.getElementsByName("password")


document.addEventListener('submit', (event) => {
    const login = loginRow[0].value
    const repassword = repasswordRow[0].value
    const email = emailRow[0].value
    const password = passwordRow[0].value


    function validationRegister(email,password,login,repassword) {
        validationLogin(email, password)

        if ( password != repassword) {
            console.log("Пароли не равны")
        }
        
    }

    console.log("validation " + !!validationLogin([1]))
    //if (!validation)
        event.preventDefault() //если не пускать пользователя дальше, то вызываем это


})

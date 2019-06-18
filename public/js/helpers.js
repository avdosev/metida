export function getJsonOptions(email, password, login=null) { //кидаются сюда уже строки
    let body = {
        "email": email,
        "password": password,
        "login": login
    }
    // if (login != null) {
    //     console.log(login)
    //     body.prototype.login = null
    //     body.login = login       
    // }
    
    let options = {
        method:"post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }


    console.log(options)
    return options
}

export async function queryToServer(options, serverError, fetchURL) {
    // if (fetchURL !== "/sign_In" || fetchURL !== "/register") {
    //     console.error("Unexpected fetched url: " + fetchURL)
    //     return -1
    // }

    try {
        const response = await fetch(fetchURL, options)
        if (response.ok) {
            document.location.href = "/"
        } else {
            errorHandler(serverError, response.text().then(errorHandler))
        }
    }
    catch(error) {
        console.error(error)
    }
}

export function showError(spanError, str) {
    spanError.innerHTML = str;
    spanError.className = 'error active';
}

export function hideError(spanError) {
    spanError.innerHTML = '';
    spanError.className = 'error';
}

export function errorHandler(serverError, err) {
    console.log(serverError)
    console.log(err)
    showError(serverError, err)
}


export function checkValidation(widget, errorSpan, strError) {
    if (widget.validity.valid) {
        hideError(errorSpan)
    }
    else {
        showError(errorSpan, strError)
    }
}

export function checkValidationWithRegExp(spanError, widget, regExp, strError) {
    if (!widget.value.match(regExp) )  { 
        showError(spanError, strError)
    }
    else {
        hideError(spanError)
    }
}


  
export function showError(widget, str) {
    widget.innerHTML = str;
    widget.className = 'error active';
}

export function hideError(widget) {
    widget.innerHTML = '';
    widget.className = 'error';
}

export function checkValidation(widget, span, str, hideFnc = null) {
    if (widget.validity.valid) {
        hideError(span)
        if(hideFnc) 
            hideFnc()
    } else {
        showError(span, str)
    }
}

export function checkValidationWithRegExp(widget, span, { regexp, error_str: str }, hideFnc = null) {
    if (!widget.value.match(regexp) )  { 
        showError(span, str)
    } else {
        hideError(span)
        if(hideFnc) 
            hideFnc()
    }
}


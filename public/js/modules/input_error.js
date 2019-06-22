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

export function checkValidationWithRegExp(widget, span, regexp, str) {
    if (!widget.value.match(regexp) )  { 
        showError(spanError, str)
    } else {
        hideError(span)
    }
}


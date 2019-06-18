import { headers as validators } from "./errorString.js"
import { showError, hideError, errorHandler, checkValidationWithRegExp } from "./helpers.js"

const md = markdownit({
    html: false,
    linkify: true,
    typographer: true
})

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById("previews");
    const header = document.querySelector('#header')
    const disclaimer = document.querySelector('#disclaimer')
    const content = document.querySelector('#article')
    const submitBtn = document.querySelector('#submit')
    
    checkbox.addEventListener("click", showArtIfCheckboxCheked)
    content.addEventListener('change', showArtIfCheckboxCheked)
    header.addEventListener('change', showArtIfCheckboxCheked)

    const headerError = document.querySelector(".headerError")
    const disclaimerError = document.querySelector(".disclaimerError")
    const contentError = document.querySelector(".contentError")



    header.addEventListener("input", () => {
        checkValidationWithRegEx(headerError, header, validators.headerRegExp, validators.strHeaderError)
    })

    disclaimer.addEventListener("input", () => {
        checkValidationWithRegEx(disclaimerError, disclaimer, validators.disclaimerRegExp, validators.strDisclaimerError)
    })

    content.addEventListener("input", () => {
        checkValidationWithRegEx(contentError, content, validators.contentRegExp, validators.strContentError)
    })


    submitBtn.addEventListener('click', (event) => {
        if ( !header.value.match(validators.headerRegExp) )  {
            showError(headerError, validators.strEventHeaderError)
            event.preventDefault();
        }
        else if(!disclaimer.value.match(validators.disclaimerRegExp) ) {
            showError(disclaimerError, validators.strDisclaimerEventError)
            event.preventDefault();
        }
        else if(!content.value.match(validators.contentRegExp) ) {
            showError(contentError, validators.strContentEventError)
            event.preventDefault();
        }
        else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ


        }
    },
    false
);

    function showArtIfCheckboxCheked() {
        let headerStr = '', textStr = '', disclaimerStr = '';
        
        if (checkbox.checked) {
            headerStr = document.getElementById('header').value
            textStr = document.getElementById('article').value
            disclaimerStr = document.getElementById('disclaimer').value

            textStr = md.render(textStr)
            disclaimerStr = md.render(disclaimerStr)
        }
        
        showArticle(headerStr, textStr, disclaimerStr)
    }
});


function showArticle(title, text, disclaimer) {
    const post_text = document.getElementsByClassName('post_text')[0]
    post_text.innerHTML = `<h1>${title}</h1>${disclaimer}${text}`;
}
import { showError, checkValidationWithRegExp as checkValidation } from "./modules/input_error.js";

// он находится в глобальной области видимости если это можно исправить с помощью модульной системы будет не плохо
// но пока так
const md = markdownit({
    html: false,
    linkify: true,
    typographer: true
})

document.addEventListener('DOMContentLoaded', start)

async function start() {
    // запрос на джсончик
    const validators = await 
        fetch('/public/json/input_errors.json').then(response => {
            if (response.ok)
                return response.json()
            else 
                console.log('с джсоном какая то проблема', response)
        })


    const checkbox = document.querySelector("#previews");
    const header = document.querySelector('#header')
    const disclaimer = document.querySelector('#disclaimer')
    const content = document.querySelector('#article')
    const submitBtn = document.querySelector('#submit')
    
    checkbox.addEventListener("click", showArtIfCheckboxCheked)

    header.addEventListener('change', showArtIfCheckboxCheked)
    disclaimer.addEventListener('change', showArtIfCheckboxCheked)
    content.addEventListener('change', showArtIfCheckboxCheked)

    const headerError = document.querySelector(".headerError")
    const disclaimerError = document.querySelector(".disclaimerError")
    const contentError = document.querySelector(".contentError")

    header.addEventListener("input", () => {
        checkValidation(header, headerError, validators.header)
    })

    disclaimer.addEventListener("input", () => {
        checkValidation(disclaimer, disclaimerError, validators.disclaimer)
    })

    content.addEventListener("input", () => {
        checkValidation(content, contentError, validators.content)
    })

    submitBtn.addEventListener('click', (event) => {
        if ( !header.value.match(validators.header.regexp) )  {
            showError(headerError, validators.header.EventError[0])
        } else if(!disclaimer.value.match(validators.disclaimer.regexp) ) {
            showError(disclaimerError, validators.disclaimer.EventError[0])
        } else if(!content.value.match(validators.content.regexp) ) {
            showError(contentError, validators.content.EventError[0])
        } else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
            return;
        }

        event.preventDefault();
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
}


function showArticle(title, text, disclaimer) {
    const post_text = document.getElementsByClassName('post_text')[0]
    post_text.innerHTML = `<h1>${title}</h1>${disclaimer}${text}`;
}
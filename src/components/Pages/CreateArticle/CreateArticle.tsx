import React from "react";
import "./create_article.css"

//script(src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.4.2/markdown-it.min.js")


import {showError, checkValidationWithRegExp as checkValidation} from "../input_error";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

// он находится в глобальной области видимости если это можно исправить с помощью модульной системы будет не плохо
// но пока так
// const md = markdownit({
//     html: false,
//     linkify: true,
//     typographer: true
// })


// async function start() {
//     const checkbox = document.querySelector("#previews");
//     const header = document.querySelector('#header')
//     const disclaimer = document.querySelector('#disclaimer')
//     const content = document.querySelector('#article')
//     const submitBtn = document.querySelector('#submit')
//
//     checkbox.addEventListener("click", showArtIfCheckboxCheked)
//
//     header.addEventListener('change', showArtIfCheckboxCheked)
//     disclaimer.addEventListener('change', showArtIfCheckboxCheked)
//     content.addEventListener('change', showArtIfCheckboxCheked)
//
//     const headerError = document.querySelector(".headerError")
//     const disclaimerError = document.querySelector(".disclaimerError")
//     const contentError = document.querySelector(".contentError")
//
//     header.addEventListener("input", () => {
//         checkValidation(header, headerError, validators.header)
//     })
//
//     disclaimer.addEventListener("input", () => {
//         checkValidation(disclaimer, disclaimerError, validators.disclaimer)
//     })
//
//     content.addEventListener("input", () => {
//         checkValidation(content, contentError, validators.content)
//     })
// }
//
//
// function showArticle(title, text, disclaimer) {
//     const post_text = document.getElementsByClassName('post_text')[0]
//     post_text.innerHTML = `<h1>${title}</h1>${disclaimer}${text}`;
// }
//
//
// interface IProps {
//
// }
//
// interface IState {
//
// }
//
// class CreateArticle  extends React.Component<IProps, IState>  {
//     constructor(props: IProps) {
//         super(props);
//
//     }
//
//     async componentDidMount() {
//         const validators = await
//         fetch('/public/json/input_errors.json').then(response => {
//             if (response.ok)
//                 return response.json()
//             else
//                 console.log('с джсоном какая то проблема', response)
//         })
//
//     }
//
//     headerDispatcher = () => {
//         checkValidation(header, headerError, validators.header)
//     }
//
//
//
//     submitBtn = (event: any) => {
//         if (!header.value.match(validators.header.regexp)) {
//             showError(headerError, validators.header.EventError[0])
//         } else if (!disclaimer.value.match(validators.disclaimer.regexp)) {
//             showError(disclaimerError, validators.disclaimer.EventError[0])
//         } else if (!content.value.match(validators.content.regexp)) {
//             showError(contentError, validators.content.EventError[0])
//         } else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
//             return;
//         }
//
//         event.preventDefault();
//     }
//
//     showArtIfCheckboxCheked = () => {
//         let headerStr = '', textStr = '', disclaimerStr = '';
//
//         if (checkbox.checked) {
//             headerStr = document.getElementById('header').value
//             textStr = document.getElementById('article').value
//             disclaimerStr = document.getElementById('disclaimer').value
//
//             textStr = md.render(textStr)
//             disclaimerStr = md.render(disclaimerStr)
//         }
//
//         showArticle(headerStr, textStr, disclaimerStr)
//     }
//
//     function render() {
//         return (<>
//                 <script type="text/javascript"
//                         src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
//                         async/>
//                 <h3>Заголовок:</h3>
//                 <input type="text" id="header" name="header" placeholder="Заголовок должен передавать основной смысл публикации."
//                        value="" minLength={5}/>
//                 <span className="headerError" onInput={this.headerDispatcher} aria-live="polite"/>
//                 <h3>Дисклеймер:</h3>
//                 <textarea className="disclaimer" id="disclaimer" placeholder="Здесь приводится краткое описание статьи."
//                           name="disclaimer"/>
//                 <span className="disclaimerError" aria-live="polite"/>
//                 <label> <input type="checkbox" id="previews"/>Предпросмотр </label>
//
//                 <textarea className="create_area" id="article" placeholder="Текст вашей статьи..." name="art"/>
//                 <span className="contentError" aria-live="polite"/>
//                 <button id="submit" onClick={this.submitBtn} className="Btn"> Отправить </button>
//
//             </>
//         )
//     }
// }
//

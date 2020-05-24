import React from "react";
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";
//import "./create_article.css"

//script(src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.4.2/markdown-it.min.js")


interface IProps {

}

interface IState {

}

export default class CreateArticle extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

    }

    async componentDidMount() {
        const validators = await
            fetch('/public/json/input_errors.json').then(response => {
                if (response.ok)
                    return response.json()
                else
                    console.log('с джсоном какая то проблема', response)
            })

    }

    // submitBtn = (event: any) => {
    //     if (!header.value.match(validators.header.regexp)) {
    //         showError(headerError, validators.header.EventError[0])
    //     } else if (!disclaimer.value.match(validators.disclaimer.regexp)) {
    //         showError(disclaimerError, validators.disclaimer.EventError[0])
    //     } else if (!content.value.match(validators.content.regexp)) {
    //         showError(contentError, validators.content.EventError[0])
    //     } else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
    //         return;
    //     }
    //
    //     event.preventDefault();
    // }

    // showArtIfCheckboxCheked = () => {
    //     let headerStr = '', textStr = '', disclaimerStr = '';
    //
    //     if (checkbox.checked) {
    //         headerStr = document.getElementById('header').value
    //         textStr = document.getElementById('article').value
    //         disclaimerStr = document.getElementById('disclaimer').value
    //
    //         textStr = md.render(textStr)
    //         disclaimerStr = md.render(disclaimerStr)
    //     }
    //
    //     showArticle(headerStr, textStr, disclaimerStr)
    // }

    render() {
        return (<SimpleTemplate header={<Header />} content={<>
                <script type="text/javascript"
                        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
                        async/>
                <h3>Заголовок:</h3>
                <input type="text" id="header" name="header"
                       placeholder="Заголовок должен передавать основной смысл публикации."
                       value="" minLength={5}/>
                <span className="headerError" aria-live="polite"/>
                <h3>Дисклеймер:</h3>
                <textarea className="disclaimer" id="disclaimer" placeholder="Здесь приводится краткое описание статьи."
                          name="disclaimer"/>
                <span className="disclaimerError" aria-live="polite"/>
                <label> <input type="checkbox" id="previews"/>Предпросмотр </label>

                <textarea className="create_area" id="article" placeholder="Текст вашей статьи..." name="art"/>
                <span className="contentError" aria-live="polite"/>
                <button id="submit" className="Btn"> Отправить</button>
            </>
            }/>


        )
    }
}

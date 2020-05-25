import React from "react";
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";
import "./create_article.css"
import * as ROUTES from "../../../config/routes"
import Field from "../../Molecules/Field/Field";
import CreateArticleForm from "../../Organisms/CreateArticleForm/CreateArticleForm";
//script(src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.4.2/markdown-it.min.js")


interface IProps {

}

interface IState {

}

export default class CreateArticle extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

    }

    showArtIfCheckboxChecked = () => {
        // let headerStr = '', textStr = '', disclaimerStr = '';
        //
        // if (checkbox.checked) {
        //     headerStr = document.getElementById('header').value
        //     textStr = document.getElementById('article').value
        //     disclaimerStr = document.getElementById('disclaimer').value
        //
        //     textStr = md.render(textStr)
        //     disclaimerStr = md.render(disclaimerStr)
        // }
        //
        // showArticle(headerStr, textStr, disclaimerStr)
    }

    // showArticle(title, text, disclaimer) {
    //     const post_text = document.getElementsByClassName('post_text')[0]
    //     post_text.innerHTML = `<h1>${title}</h1>${disclaimer}${text}`;
    // }

    render() {
        return (<SimpleTemplate header={<Header/>} content={
                <div className="layout_body">
                    <div className="content">
                        <script type="text/javascript"
                                src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
                                async/>
                        <CreateArticleForm onRenderPreview={this.showArtIfCheckboxChecked} />
                    </div>
                </div>
            }/>


        )
    }
}

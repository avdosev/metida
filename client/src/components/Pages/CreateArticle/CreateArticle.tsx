import React from "react";
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Header from "../../../containers/HeaderContainer";
import "./create_article.css"
import * as ROUTES from "../../../config/routes"
import CreateArticleForm from "../../Organisms/CreateArticleForm/CreateArticleForm";
import PreviewArticle from "../../Molecules/PreviewArticles/PreviewArticle";


interface IProps {

}

interface IState {
    header: string,
    disclaimer: string,
    content: string
}


export default class CreateArticle extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {header: '', disclaimer: '', content: ''}
        document.title = "Создание статьи";
    }

    showArtIfCheckboxChecked = (header: string, disclaimer: string, content: string) => {
        this.setState({header: header, content: content, disclaimer: disclaimer})
    }


    render() {
        return (<SimpleTemplate>
                <div className="layout_body">
                    <div className="content">
                        <script type="text/javascript"
                                src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
                                async/>
                        <script type="text/javascript"
                                src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.4.2/markdown-it.min.js"
                                async/>
                        <CreateArticleForm onRenderPreview={this.showArtIfCheckboxChecked}/>
                        <PreviewArticle header={this.state.header} content={this.state.content}
                                        disclaimer={this.state.disclaimer}/>
                    </div>
                </div>
            </SimpleTemplate>
        )
    }
}

import React from "react";
import "../../main.css"
import "../../lenta.css"
import "../../colors.css"
import { insertPostPreview } from "./articles.jsx"
import {get, post} from "../../Router";


interface IProps {

}

interface IState {

}


export default class Index extends React.Component<IProps, IState>{
    articlesCount = 10; //число статей, которые будут на странице до нажатия кнопки
    currentCountOfArticles = 0; //мини костылек, не смотри сюда //это статическая переменная

    getArticle = async (articlesCount=0) => {
        const json = await post('/api/top', {
            "begin": this.currentCountOfArticles,
            "end": this.currentCountOfArticles+articlesCount
        })

        const insertElem = document.querySelector('.lenta')

        for (let i = 0; i < json.length; i++) {
            if (json[i] == undefined) {
                console.error("Все");
                break
            }
            insertPostPreview(json[i], insertElem);
        }
        this.currentCountOfArticles+=json.length;

    }
    getMoreArticles = async (e: any) => {
        await this.getArticle(this.articlesCount)
    }

    async componentDidMount() {
        await this.getArticle(this.articlesCount)
    }


    render() {
        return(<>
                <div className="layout_body"> </div>
                <div className="content.content"> </div>
                <h1>Умная лента</h1>
                <hr className="head" />
                <div className="lenta"> </div>
                <button className="getMoreArticles" onClick={this.getMoreArticles}>Показать больше</button>

            </>
        )
    }


}








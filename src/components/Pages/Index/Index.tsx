import React from "react";
import "../../main.css"
import "../../lenta.css"
import "../../colors.css"
import { insertPostPreview } from "./articles.jsx"
const articlesCount = 10; //число статей, которые будут на странице до нажатия кнопки
let currentCountOfArticles = 0; //мини костылек, не смотри сюда //это статическая переменная




export default function Index() {
    function getMoreArticles(e: any) {
        getArticle(articlesCount)
    }

    getArticle(articlesCount)

    return(<>
        <div className="layout_body"> </div>
        <div className="content.content"> </div>
        <h1>Умная лента</h1>
        <hr className="head" />
        <div className="lenta"> </div>
        <button className="getMoreArticles" onClick={getMoreArticles}>Показать больше</button>

        </>
    )
}



function getArticle(articlesCount=0) {
    fetch('./top', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "begin": currentCountOfArticles,
            "end": currentCountOfArticles+articlesCount
        })
    }).then(value => {
        return value.json()
    }).then((json => {
        const insertElem = document.querySelector('.lenta')

        for (let i = 0; i < json.length; i++) {
            if (json[i] == undefined) {
                console.error("Все");
                break
            }
            insertPostPreview(json[i], insertElem);
        }
        currentCountOfArticles+=json.length;
    })).catch(error => {
        console.error(error);
    })
}




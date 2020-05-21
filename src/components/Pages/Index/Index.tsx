import React from "react";
import "../../main.css"
import "../../lenta.css"
import "../../colors.css"
import {Post} from "../../Molecules/Post/Post.jsx"
import {get, post} from "../../Router";
import Feed from "../../Molecules/Feed/Feed";
import SimplePage from "../../Templates/SimplePage";
import Header from "../../Molecules/Header/Header";
import Sign_InForm from "../../Organisms/Sign_InForm/Sign_InForm";
import Footer from "../../Organisms/Footer/Footer";


interface IProps {

}

interface IState {
    json: object,
    lenta: Array<JSX.Element>
}


export default class Index extends React.Component<IProps, IState> {
    articlesCount = 10; //число статей, которые будут на странице до нажатия кнопки
    currentCountOfArticles = 0; //мини костылек, не смотри сюда //это статическая переменная

    constructor(props: IProps) {
        super(props);

        this.state = {json: {}, lenta: []}
    }

    getArticle = async (articlesCount = 0) => {
        const json = await post('/top', {
            "begin": this.currentCountOfArticles,
            "end": this.currentCountOfArticles + articlesCount
        })

        for (let i = 0; i < json.length; i++) { // ну го проверим, а так хз зачем нужен этот блок
            if (json[i] == undefined) {
                console.error("Все");
                break
            }
        }

        let lenta = this.state.lenta
        for (const post of json) {
            lenta.push(<Post key={post.id} json={post}/>)
        }


        this.setState({lenta: lenta})

        this.currentCountOfArticles += json.length;
    }
    getMoreArticles = async (e: any) => {
        await this.getArticle(this.articlesCount)
    }

    async componentDidMount() {
        await this.getArticle(this.articlesCount)
    }


    render() {
        return (<SimplePage header={<Header/>} content={
            <div className="layout_body">
                <div className="content.content">
                    <h1>Умная лента</h1>
                    <hr className="head"/>
                    <Feed>
                        <div className="post">
                            {this.state.lenta}
                        </div>
                    </Feed>
                    <button className="getMoreArticles" onClick={this.getMoreArticles}>Показать больше</button>
                </div>
            </div>
        }
                            footer={<Footer/>}/>)
    }


}








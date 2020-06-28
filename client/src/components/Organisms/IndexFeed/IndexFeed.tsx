import React, { useState } from 'react';
import 'Styles/main.scss';
import 'Styles/lenta.scss';
import 'Styles/colors.scss';
import { post } from '../../../services/router';
import Feed from '../../Organisms/Feed/Feed';
import SimplePage from '../../Templates/SimpleTemplate';
import { debounce } from '../../../services/functional';
import { CustomButton, IndexShortPost } from 'Components';

interface IProps {}

interface IState {
    lenta: Array<JSX.Element>;
}

export default class IndexFeed extends React.Component<IProps, IState> {
    articlesCount = 10; //число статей, которые будут на странице до нажатия кнопки (а также столько мы будем гетить за раз)
    timeFromPreviousLoad = 0;

    constructor(props: IProps) {
        super(props);

        this.state = { lenta: [] };
        document.title = 'Metida';
        //document.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = async () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }

        const getter = debounce(this.getArticle, 100);
        await getter(10);
    };

    componentWillUnmount() {
        debugger;
        //document.removeEventListener('scroll', this.handleScroll)
    }

    getArticle = async (articlesCount = 10) => {
        console.log('Fetch more list items!');

        const json = await post('/top', {
            begin: this.state.lenta.length,
            end: this.state.lenta.length + articlesCount,
        });
        //debugger;

        for (let i = 0; i < json.length; i++) {
            // ну го проверим, а так хз зачем нужен этот блок
            if (json[i] == undefined) {
                console.error('Все');
                break;
            }
        }

        let lenta = [...this.state.lenta];
        for (const post of json) {
            lenta.push(<IndexShortPost key={post.id} json={post} />);
        }

        this.setState({ lenta: lenta }, () => console.log(this.state));
    };

    getMoreArticles = async (e: any) => {
        await this.getArticle(this.articlesCount);
    };

    async componentDidMount() {
        await this.getArticle(this.articlesCount);
    }

    render() {
        return (
            <SimplePage>
                <div className="layout_body">
                    <div className="content">
                        <h1>Умная лента</h1>
                        <hr className="head" />
                        <Feed>{this.state.lenta}</Feed>
                        <CustomButton text="Показать больше" onClick={this.getMoreArticles} />
                    </div>
                </div>
            </SimplePage>
        );
    }
}

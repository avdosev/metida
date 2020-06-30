import React, { useState } from 'react';
import 'Styles/main.scss';
import 'Styles/lenta.scss';
import 'Styles/colors.scss';
import SimplePage from '../../Templates/SimpleTemplate';
import { post } from 'Services/router';
import { debounce } from 'Services/functional';
import { CustomButton, IndexShortPost, IndexShortPostPlaceholder, Feed } from 'Components';

interface IProps {}

interface IState {
    lenta: Array<JSX.Element>;
    placeholderFeed: Array<JSX.Element>;
    isLoaded: boolean;
}

export default class IndexFeed extends React.Component<IProps, IState> {
    private articlesCount = 10; //число статей, которые будут на странице до нажатия кнопки (а также столько мы будем гетить за раз)
    private skeletonsCount = 3;

    constructor(props: IProps) {
        super(props);
        let lenta = [];
        for (let i = 0; i < this.articlesCount; i++) {
            lenta.push(<IndexShortPostPlaceholder key={i} />);
        }
        this.state = { lenta: [], placeholderFeed: lenta, isLoaded: false };
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
        //document.removeEventListener('scroll', this.handleScroll)
    }

    getArticle = async (articlesCount = 10) => {
        console.log('Fetch more list items!');

        const json = await post('/top', {
            begin: this.state.lenta.length,
            end: this.state.lenta.length + articlesCount,
        });

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

        this.setState({ lenta: lenta, isLoaded: true }, () => console.log(this.state));
    };

    getMoreArticles = async (e: any) => {
        await this.getArticle(this.articlesCount);
    };

    async componentDidMount() {
        await this.getArticle(this.articlesCount);
    }

    render() {
        console.log(this.state.isLoaded, this.state.lenta, this.state.placeholderFeed);
        return (
            <SimplePage>
                <div className="layout_body">
                    <div className="content">
                        <h1>Умная лента</h1>
                        <hr className="head" />
                        <Feed>{this.state.isLoaded ? this.state.lenta : this.state.placeholderFeed}</Feed>
                        <CustomButton text="Показать больше" onClick={this.getMoreArticles} />
                    </div>
                </div>
            </SimplePage>
        );
    }
}

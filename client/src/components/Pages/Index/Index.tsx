import React from 'react';
import '../../styles/main.scss';
import '../../styles/lenta.scss';
import '../../styles/colors.scss';
import { IndexShortPost } from '../../Atoms/IndexShortPost/IndexShortPost';
import { post } from '../../../services/router';
import Feed from '../../Organisms/Feed/Feed';
import SimplePage from '../../Templates/SimpleTemplate';
import Header from '../../../containers/ChangeHeaderEvent/HeaderContainer';
import Footer from '../../Molecules/Footer/Footer';

interface IProps {}

interface IState {
    json: object;
    lenta: Array<JSX.Element>;
}

export default class Index extends React.Component<IProps, IState> {
    articlesCount = 10; //число статей, которые будут на странице до нажатия кнопки (а также столько мы будем гетить за раз)
    currentCountOfArticles = 0; //это статическая переменная

    constructor(props: IProps) {
        super(props);

        this.state = { json: {}, lenta: [] };
        document.title = 'Metida';

        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = async () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        await this.getArticle(this.articlesCount);
        console.log('Fetch more list items!');
    };

    getArticle = async (articlesCount = 0) => {
        const json = await post('/top', {
            begin: this.currentCountOfArticles,
            end: this.currentCountOfArticles + articlesCount,
        });

        for (let i = 0; i < json.length; i++) {
            // ну го проверим, а так хз зачем нужен этот блок
            if (json[i] == undefined) {
                console.error('Все');
                break;
            }
        }

        let lenta = this.state.lenta;
        for (const post of json) {
            lenta.push(<IndexShortPost key={post.id} json={post} />);
        }

        this.setState({ lenta: lenta });

        this.currentCountOfArticles += json.length;
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
                        <button type="button" className="mainButton" onClick={this.getMoreArticles}>
                            Показать больше
                        </button>
                    </div>
                </div>
            </SimplePage>
        );
    }
}

import React from 'react';
import SimpleTemplate from '../../Templates/SimpleTemplate';
import Header from '../../../containers/ChangeHeaderEvent/HeaderContainer';
import 'Styles/create_article.scss';
import CreateArticleForm from '../../Organisms/CreateArticleForm/CreateArticleForm';
import PreviewArticle from '../../Molecules/PreviewArticles/PreviewArticle';

interface IProps {}

interface IState {
    header: string;
    disclaimer: string;
    content: string;
}

export default class CreateArticle extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { header: '', disclaimer: '', content: '' };
        document.title = 'Создание статьи';
    }

    showArtIfCheckboxChecked = (header: string, disclaimer: string, content: string) => {
        this.setState({ header: header, content: content, disclaimer: disclaimer });
    };

    render() {
        return (
            <SimpleTemplate>
                <div className="layout_body">
                    <div className="content">
                        <CreateArticleForm onRenderPreview={this.showArtIfCheckboxChecked} />
                        <PreviewArticle header={this.state.header} content={this.state.content} disclaimer={this.state.disclaimer} />
                    </div>
                </div>
            </SimpleTemplate>
        );
    }
}

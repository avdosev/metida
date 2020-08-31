import React from 'react';
import SimpleTemplate from '../../Templates/SimpleTemplate';
import Header from '../../../containers/ChangeHeaderEvent/HeaderContainer';
import 'Styles/create_article.scss';
import CreateArticleForm from '../../Organisms/CreateArticleForm/CreateArticleForm';
import PreviewArticle from '../../Molecules/PreviewArticles/PreviewArticle';
import * as ROUTES from '../../../config/routes';

interface IProps {}

interface IArticle {
    header: string;
    disclaimer: string;
    content: string;
}

interface IState extends IArticle {
    showPreview: boolean;
}

export default class CreateArticle extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { header: '', disclaimer: '', content: '', showPreview: false };
        document.title = 'Создание статьи';
    }

    onChangeArticle = (header: string, disclaimer: string, content: string) => {
        this.setState({ header: header, content: content, disclaimer: disclaimer });
    };

    onShowPreview = (show: boolean) => {
        this.setState({ showPreview: show });
    };

    render() {
        return (
            <SimpleTemplate>
                <div className="layout_body space_around_inner">
                    <div className="content">
                        <CreateArticleForm
                            onRenderPreview={this.onChangeArticle}
                            onPreviewChange={this.onShowPreview}
                            headerDefault=""
                            contentDefault=""
                            disclaimerDefault=""
                            requestURL={ROUTES.CREATE_ARTICLE}
                            method="post"
                        />
                    </div>
                    <div className="content" style={this.state.showPreview ? {} : { display: 'none' }}>
                        <PreviewArticle
                            header={this.state.header}
                            content={this.state.content}
                            disclaimer={this.state.disclaimer}
                        />
                    </div>
                </div>
            </SimpleTemplate>
        );
    }
}

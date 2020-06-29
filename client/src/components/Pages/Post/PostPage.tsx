import React from 'react';
import { getArticleId } from 'Services/comments';
import SimpleTemplate from '../../Templates/SimpleTemplate';
import { Article } from 'Components';

interface IProps {}

export default function PostPage(props: IProps) {
    return (
        <SimpleTemplate>
            <Article articleId={getArticleId()} />{' '}
        </SimpleTemplate>
    );
}

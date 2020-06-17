import React from "react";
import {getArticleId} from '../../../services/comments';
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Article from "../../Organisms/Article/Article";


interface IProps {

}

export default function PostPage(props: IProps) {
    return (<SimpleTemplate><Article articleId={getArticleId()} /> </SimpleTemplate>)
}


import * as commentApi from '../../services/comments.js';
import {MarkdownToHtml} from '../../services/markdown.js';
import {NextFunction, Request, Response} from "express";
import {initValues} from "../../services/initValues";


async function getComments(req: Request, res: Response, next: NextFunction) {
    const articleId = parseInt(req.params.id);

    try {
        const comment = await commentApi.getAllCommentsByArticle(articleId)
        initValues(res)
        res.values.comments = comment;
    }catch (e) {
        console.log(e)
        res.values.comments = []
    }

    next()

}

async function pushComment(req: Request, res: Response, next: NextFunction) {
    const articleId = req.body.articleId;
    const author = req.body.userId;
    const text = req.body.comment;

    if (text == undefined) {
        console.error("Текст коммента до сюда не дошел. req.body.comment == undefined")
        return
    }
    let answeringId
    if (req.body.answeringId)
        answeringId = req.body.answeringId
    else if (req.query.answeringId)
        answeringId = req.query.answeringId
    else
        answeringId = null; // Этот нейминг важно(нет можно просто имена заменить) соблюсти для фронтендера

    try {
        const comment = await commentApi.pushComment(articleId, author, MarkdownToHtml(text), answeringId)
        initValues(res)
        res.values.success = true;
        next()
    }catch (e) {
        initValues(res)
        res.values.success = false;
        console.error(e);
    }
    next()
}

export {
    getComments,
    pushComment
};

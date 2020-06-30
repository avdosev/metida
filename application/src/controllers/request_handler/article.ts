import * as articleApi from '../../services/article.js';
import { MarkdownToHtml } from '../../services/markdown.js';
import { NextFunction, Request, Response } from 'express';
import { initValues } from '../../services/initValues';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { getJwtTokenFromHeaderParams, verify } from '../logged';
import { secretKey } from '../../config';

export async function updateArticle(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const header = req.body.header;
    const content = req.body.art;
    const disclaimer = req.body.disclaimer;

    initValues(res);

    try {
        const article = await articleApi.updateArticle(
            parseInt(id),
            MarkdownToHtml(content),
            header,
            MarkdownToHtml(disclaimer)
        );
        res.values.article = article.dataValues;
        res.values.success = true;
    } catch (e) {
        console.error(e);
        res.values.success = true;
    }
}

export async function pushArticle(req: Request, res: Response, next: NextFunction) {
    const { header, content, disclaimer } = req.body;
    console.log(header, content, disclaimer);

    // const token = getJwtTokenFromHeaderParams(req);
    //const authorId = req.userId;
    // const user = verify(token);

    // const authorId = user.id;
    const authorId = req.userId;
    initValues(res);
    try {
        const result = await articleApi.pushArticle(header, content, disclaimer, authorId);
        res.values.success = true;
        res.values.article = result.dataValues;
    } catch (e) {
        console.error(e);
        res.values.success = false;
    }

    next();
}

export async function getTopArticles(req: Request, res: Response, next: NextFunction) {
    const begin = req.body.begin ?? 0;
    const end = req.body.end ?? 10;
    const type = req.body.type ?? 'date';
    const minDate = req.body.minDate ? new Date(req.body.minDate) : new Date(1999, 11, 11);

    initValues(res);

    try {
        res.values.TopArticles = await articleApi.getTopArticles(begin, end, type, { minDate });
    } catch (e) {
        console.error(e);
        res.values.TopArticles = [];
    }
    next();
}

export async function getArticle(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);

    const article = await articleApi.getArticle(id);
    initValues(res);
    res.values.article = article;
    next();
}

export async function removeArticle(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const authorId = req.user.id;

    try {
        await articleApi.removeArticle(id, authorId);
        initValues(res);
        res.values.success = true;
    } catch (e) {
        console.error(e);
        res.values.success = false;
    }
    next();
}

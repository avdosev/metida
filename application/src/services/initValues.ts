import {Request, Response} from "express";

export function initValues(req: Request | Response) {
    if (!req.values) {
        req.values = {};
    }
}

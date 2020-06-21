import path from "path";
import {clientDir, mainDir} from "../config"
import express, {Request, Response} from "express";

function sender(req: Request, res: Response) {
    res.sendFile(path.join(clientDir, 'index.html'));
}

export const initClientControllers = (app) => {
    app.use(express.static(clientDir));
    app.get('*', sender);

}

export default {initClientControllers}
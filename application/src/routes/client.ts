import path from "path";
import {mainDir} from "../config"
import express, {Request, Response} from "express";

function sender(req: Request, res: Response) {
    res.sendFile(path.join(buildDir, 'index.html'));

}

export const initClientControllers = (app) => {
    const buildDir = path.join(mainDir, 'client', 'dist')
    app.use(express.static(buildDir));
    app.get('*', sender);

}

export default {initClientControllers}
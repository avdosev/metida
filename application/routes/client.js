import path from "path";
import {mainDir} from "../config/index.js"
import express from "express";

export const initClientControllers = (app) => {
    const buildDir = path.join(mainDir, 'client', 'dist')
    app.use(express.static(buildDir));
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildDir, 'index.html'));
    });

}

export default {initClientControllers}
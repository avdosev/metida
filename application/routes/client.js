import path from "path";
import config from "../config";
import express from "express";

export const initClientControllers = (app) => {
    const buildDir = path.join(config.mainDir, 'client', 'dist')
    app.use(express.static(buildDir));
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildDir, 'index.html'));
    });

}

export default {initClientControllers}
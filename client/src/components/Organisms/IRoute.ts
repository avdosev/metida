import React from "react";
import {RouteProps} from "react-router-dom";

interface IRoute extends RouteProps {
    auth: () => Promise<boolean>;
    isAllowed?: boolean;
}


export type {IRoute}
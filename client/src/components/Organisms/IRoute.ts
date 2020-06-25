import { RouteProps } from 'react-router-dom';

export interface IRoute extends RouteProps {
    isAuth: any;
    isAllowed?: boolean;
}

export interface IReferable {
    referrer: JSX.Element | null
}

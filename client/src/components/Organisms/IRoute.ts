import { RouteProps } from 'react-router-dom';

interface IRoute extends RouteProps {
    isAuth: any;
    isAllowed?: boolean;
}

export type { IRoute };

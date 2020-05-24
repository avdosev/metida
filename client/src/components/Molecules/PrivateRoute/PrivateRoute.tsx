import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from "../../../config/routes"
import {IRoute} from "../../Organisms/IRoute";

interface IState {
    auth: boolean,
    requested: boolean
}

export class PrivateRoute extends React.Component<IRoute, IState>{
    redirectPath = ROUTES.SIGN_IN;

    constructor(props: IRoute) {
        super(props);
        this.state = {
            auth: false,
            requested: false // если мы запросили значение с сервера, выставляем флаг на true
        }
    }

    async componentDidMount() {
        const auth = await this.props.isAuth()
        this.setState({auth: auth, requested: true})
    }

    render() {
        if (!this.state.requested) { // это нужно для того, чтобы поддержать redirect компонент, т.к. если мы сразу отправим редирект, мы не дождемся никогда окончания работы асинхронной функции
            return <> </>
        }

        if (!this.state.auth) {
            const renderComponent = () => <Redirect to={this.redirectPath} />;
            return <Route {...this.props} component={renderComponent} render={undefined} />;
        } else {
            return <Route {...this.props} />;
        }
    }
}


export default PrivateRoute
import React from 'react';
import ReactDOM from 'react-dom';
import '../test/matchMedia.mock';
import App from './App';
import { store } from '../store';
import { Provider } from 'react-redux';

it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <App />{' '}
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

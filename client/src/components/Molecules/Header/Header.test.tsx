import React from 'react';
import { configure, mount } from 'enzyme';
import Header from '../../../containers/ChangeHeaderEvent/HeaderContainer';
import Adapter from 'enzyme-adapter-react-16';
import Sign_InForm from '../../../containers/ChangeHeaderEvent/SignInFormContainer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Burger, MainLogo } from '../../index';

const mockStore = configureStore([]);

describe('<Header/>', () => {
    const config = configure({ adapter: new Adapter() });

    it('should render self an', () => {
        const header = mount(
            <BrowserRouter>
                <Provider store={mockStore()}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );
        console.log(header.debug());
        expect(header.find(MainLogo)).toHaveLength(1);
        expect(header.find(Burger)).toHaveLength(1);
    });
});

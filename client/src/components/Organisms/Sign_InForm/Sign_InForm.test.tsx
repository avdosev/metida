import React from 'react';
import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';

import Sign_InForm from '../../../containers/ChangeHeaderEvent/SignInFormContainer';
import config from '../../../test/enzymeConfig';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../App';
import { Provider } from 'react-redux';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { ErrorPlaceholder, FieldInput, FormButton } from '../../index';
import fetch, { Response } from 'node-fetch';

const mockStore = configureStore([]);
jest.mock('node-fetch');

describe('<SignInForm/>', () => {
    const config = configure({ adapter: new Adapter() });

    let store;
    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    beforeEach(() => {
        store = mockStore({
            myState: 'sample text',
        });
        const mock = jest.fn();
        wrapper = mount(
            <Provider store={store}>
                <Sign_InForm />
            </Provider>
        );
        //console.log(wrapper.debug());
    });

    it('should render self an', () => {
        expect(wrapper.find(FieldInput).length).toBe(2);
        expect(wrapper.find(FormButton)).toHaveLength(1);

        expect(wrapper.find('input').length).toBe(2);
        expect(wrapper.find('.password').length).toBe(1);
        expect(wrapper.find('.email').length).toBe(1);
    });

    it('should change fields', () => {
        const myform = mount(
            <Provider store={mockStore()}>
                <Sign_InForm />
            </Provider>
        );

        const emailInput = myform.find('#email');
        const passwordInput = myform.find('#password');

        emailInput.simulate('change', { target: { name: 'email', value: 'email23@yandex.ru' } });
        passwordInput.simulate('change', { target: { value: 'sssssss1' } });

        const fakeEvent = { preventDefault: () => console.log('gdgsgsdgsdgsgsdgsgsgsgsgsdgs222') };
        myform.find('form').simulate('submit', fakeEvent);

        //console.log(myform.debug())

        //expect(myform.find(ErrorPlaceholder).last().text()).toBeTruthy(); // last т.к. мы проверяем серверный отклик
        // для строки сойдет

        expect(fetch).toHaveBeenCalled();
    });
});

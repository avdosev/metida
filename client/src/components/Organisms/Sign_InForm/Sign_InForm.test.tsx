import React from 'react';
import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import Sign_InForm from '../../../containers/ChangeHeaderEvent/SignInFormContainer';
//import Sign_InForm from "./Sign_InForm";
import config from '../../../test/enzymeConfig';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../App';
import { Provider } from 'react-redux';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { FieldInput, FormButton } from '../../index';
import ValidateForm from '../ValidableForm/ValidateForm';

const mockStore = configureStore([]);

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
        console.log(wrapper.debug());
    });

    it('should render self an', () => {
        expect(wrapper.find(FieldInput).length).toBe(2);
        expect(wrapper.find(FormButton)).toHaveLength(1);

        expect(wrapper.find('input').length).toBe(2);
        expect(wrapper.find('.password').length).toBe(1);
        expect(wrapper.find('.email').length).toBe(1);
    });

    it('should change fields', () => {
        const changeUsernameSpy = jest.fn();

        const emailInput = wrapper.find('.email');
        const passwordInput = wrapper.find('.password');

        emailInput.simulate('change', { target: { value: 'email23@yandex.ru' } });
        passwordInput.simulate('change', { target: { value: 'sssssss1' } });

        expect(emailInput.text()).toBe('email23@yandex.ru');
        expect(passwordInput.text()).toBe('sssssss1');

        const submitBtn = wrapper.find(FormButton);
        submitBtn.simulate('click');

        expect(fetch).toHaveBeenCalled();
    });
});

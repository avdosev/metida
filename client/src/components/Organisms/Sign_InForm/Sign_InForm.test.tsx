import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Sign_InForm from '../../../containers/ChangeHeaderEvent/SignInFormContainer';
import config from '../../../test/enzymeConfig';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../App';
import { Provider } from 'react-redux';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('<SignInForm/>', () => {
    const config = configure({ adapter: new Adapter() });

    let store;
    let component: ReactTestRenderer;
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        store = mockStore({
            myState: 'sample text',
        });
        wrapper = shallow(
            <Provider store={store}>
                <Sign_InForm />
            </Provider>
        );
        console.log(wrapper.debug());
    });

    it('should render self an', () => {
        // Выведем отрендеренный компонент
        //  renderer.create()
        // // expect(component.find('button').type()).toBe('submit');
        //  expect(component.find('input').length).toBe(2);
        //  expect(component.find('.email').length).toBe(1)
        //  expect(component.find('.password').length).toBe(1)
    });

    it('should change fields', () => {
        const changeUsernameSpy = jest.fn();

        wrapper.find('.email').simulate('change', { target: { value: 'email23@yandex.ru' } });
        wrapper.find('.password').simulate('change', { target: { value: 'sssssss1' } });

        expect(changeUsernameSpy).toBeCalledWith('Test');
    });
});

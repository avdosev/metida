import React from 'react'
import {shallow} from 'enzyme'
import Sign_InForm from "../../../containers/ChangeHeaderEvent/SignInFormContainer";
import config from "../../../.jest/enzymeConfig"
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {store} from "../../../store";
import App from "../../App";
import {Provider} from "react-redux";


describe('<SignInForm/>', () => {
    it('should render self an', () => {
        const config = configure({ adapter: new Adapter() });

        const renderedComponent = shallow(
            <Provider store={store}><Sign_InForm/></Provider>
        );

        // Выведем отрендеренный компонент
        console.log(renderedComponent.debug());

       // expect(renderedComponent.find('button').type()).toBe('submit');
        expect(renderedComponent.find('input').length).toBe(2);
        expect(renderedComponent.find('.email').length).toBe(1)
        expect(renderedComponent.find('.password').length).toBe(1)
    });

    it('should call changeUsername on input changes', () => {
        const changeUsernameSpy = jest.fn();

        const renderedComponent = shallow( <Provider store={store}><Sign_InForm/></Provider>);

        renderedComponent.find('.email').simulate('change', {target: {value: 'email23@yandex.ru'}});
        renderedComponent.find('.password').simulate('change', {target: {value: 'sssssss1'}});


        expect(changeUsernameSpy).toBeCalledWith('Test');
    });
});
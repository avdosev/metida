import React from 'react';
import { shallow } from 'enzyme';
import Sign_InForm from '../../../containers/ChangeHeaderEvent/SignInFormContainer';
import config from '../../../test/enzymeConfig';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../../../store';
import App from '../../App';
import { Provider } from 'react-redux';
import Form from './Form';
import CommentForm from '../../Organisms/CommentForm/CommentForm';

describe('<Form/>', () => {
    it('should render self an', () => {
        const config = configure({ adapter: new Adapter() });

        function f() {}
        const renderedComponent = shallow(<CommentForm onCommentChanged={f} />);

        // Выведем отрендеренный компонент
        console.log(renderedComponent.debug());
    });
});

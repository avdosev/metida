import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Sign_InForm from '../../../containers/ChangeHeaderEvent/SignInFormContainer';
import { CommentForm, Form, FormButton } from 'Components';
import { IComments } from '../IComment';
import ValidateForm from '../ValidableForm/ValidateForm';
import Adapter from 'enzyme-adapter-react-16';

const onCommentChanged = (newComments: Array<IComments>) => {
    // this.setState({ comments: newComments });
};

describe('<CommentForm/>', () => {
    const config = configure({ adapter: new Adapter() });

    it('should render unauthorised form', () => {
        const unauthorisedCommentForm = mount(<CommentForm isAuth={false} onCommentChanged={onCommentChanged} />);
        expect(unauthorisedCommentForm.find('input')).toHaveLength(0);
        unauthorisedCommentForm.unmount();
    });

    it('should render authorised form', () => {
        const authorisedCommentForm = mount(<CommentForm isAuth={true} onCommentChanged={onCommentChanged} />);
        console.log(authorisedCommentForm.debug());
        expect(authorisedCommentForm.find(ValidateForm)).toHaveLength(1);
        expect(authorisedCommentForm.find(FormButton)).toHaveLength(1);
        authorisedCommentForm.unmount();
    });

    it('should change field', () => {
        const handleChange = jest.fn();
        const commentForm = mount(<CommentForm onCommentChanged={handleChange} isAuth={true} />);
        const inputableString = 'test comment';

        const commentInput = commentForm.find('.comment_area');
        commentInput.simulate('change', { target: { value: inputableString } });
        expect(commentInput.text()).toBe(inputableString);
        commentForm.unmount();
    });
});

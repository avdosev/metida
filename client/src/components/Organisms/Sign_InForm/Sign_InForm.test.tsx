import renderer from 'react-test-renderer';
import React from "react";
import SignInForm from "../../../containers/ChangeHeaderEvent/SignInFormContainer";

it("render correctly date component", () => {
    const DateInputComponent = renderer.create(<SignInForm />).toJSON();
    expect(DateInputComponent).toMatchSnapshot();
});

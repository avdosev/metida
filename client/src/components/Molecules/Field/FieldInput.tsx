import React from "react";
import ErrorPlaceholder from "../../Atoms/ErrorPlaceholder/ErrorPlaceholder";
import Input from "../../Atoms/Input/Input";
import { ITextFieldErrored } from "./IField";

interface IProps extends ITextFieldErrored {}

export default function FieldInput(props: IProps) {
  const valid = props.validate(props.value);

  return (
    <>
      <Input {...props} />
      <ErrorPlaceholder
        valid={valid}
        value={props.errorText}
        showStrategy={props.showErrorStrategy}
      />
    </>
  );
}

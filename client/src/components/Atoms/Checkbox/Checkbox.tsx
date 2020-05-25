import React from "react";

interface IProps {
    id: string,
    label: string,
    [field: string]: any
}

export default function Checkbox(props: IProps) {
    return (<label> <input type="checkbox" {...props} />{props.label} </label>)
}
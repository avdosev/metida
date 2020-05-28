import React, {useState} from "react";

interface IProps {
    id: string,
    label: string,
    [field: string]: any
}

export default function Checkbox(props: IProps) {
    const [check, setX] = useState(false);

    const soldCheckbox = (event: any) => {
        console.log(check, event.target.checked);
        setX(event.target.checked);
    };

    return (<label> <input type="checkbox" checked={check} onChange={soldCheckbox} {...props} />{props.label} </label>)
}
import React from 'react';
import { eqProps } from 'ramda';

interface IProps {
    toggleMethod?: (event: any) => void;
    lineHeight: number;
    lineWidth: number;
    id: string;
}

export default function BurgerImage(props: IProps) {
    const viewBox = `0 0 ${props.lineWidth} ${props.lineHeight * 5}`;
    return (
        <svg
            width={40}
            viewBox={viewBox}
            fill="hsl(0, 0%, 20%)"
            className="icon"
            id={props.id}
            onClick={props.toggleMethod}
            aria-label="Меню"
        >
            <rect width={props.lineWidth} height={props.lineHeight} x={0} y={0} />
            <rect width={props.lineWidth} height={props.lineHeight} x={0} y={props.lineHeight * 2} />
            <rect width={props.lineWidth} height={props.lineHeight} x={0} y={props.lineHeight * 4} />
        </svg>
    );
}

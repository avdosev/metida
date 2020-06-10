import React from 'react';
import style from "./bubble.module.css"

interface IProps  {
    // color: string,
    // duration: number,
    // size: number,
}

const BubbleLoader = (props: IProps) => (
    <div className={style.bubble} />
);

// BubbleLoader.defaultProps = {
//     color: '#000',
//     duration: 1.8,
//     size: 10,
// };

export default BubbleLoader;
import React from 'react';

interface IProps {
    width: number;
    height: number;
    lines?: number;
    className?: string;
}

const SkeletonSvgTransition = (styles: IProps) => {
    function rect(x: number, y: number, width: number, height: number) {
        return <rect x={x} y={y} rx="15" ry="15" width={width} height={height} fill="url(#g1)" />;
    }

    let lines = [];
    if (styles.lines) {
        const lineHeight = Math.floor(styles.width / styles.lines / 2);
        for (let i = 0; i < styles.lines; i++) {
            lines.push(rect(0, (i * lineHeight) / 1.5, styles.width, lineHeight / 2));
        }
    }

    const svg = (
        <svg className={styles.className} width={styles.width} height={styles.height}>
            <defs>
                <linearGradient id="g1" x1="-20%" y1="50%" x2="00%" y2="50%">
                    <animate attributeName="x1" from="-20%" to="100%" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="x2" from="00%" to="120%" dur="1s" repeatCount="indefinite" />
                    <stop stopColor="lightgray" offset="0%">
                        <animate
                            attributeName="stop-color"
                            values="lightgray; gray; lightgray"
                            keyTimes="0; 0.5; 1"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop stopColor="lightgray" offset="30%">
                        <animate
                            attributeName="stop-color"
                            values="lightgray; gray; lightgray"
                            keyTimes="0; 0.5; 1"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop stopColor="lightgray" offset="50%"></stop>
                    <stop stopColor="lightgray" offset="70%">
                        <animate
                            attributeName="stop-color"
                            values="lightgray; gray; lightgray"
                            keyTimes="0; 0.5; 1"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop stopColor="lightgray" offset="100%">
                        <animate
                            attributeName="stop-color"
                            values="lightgray; gray; lightgray"
                            keyTimes="0; 0.5; 1"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </stop>
                </linearGradient>
            </defs>
            {/*<rect x="0" y="0" width="100%" height="100%" fill="gray" />*/}
            {styles.lines ? lines : rect(0, 0, styles.width, styles.height)}
        </svg>
    );

    return svg;
};

export default SkeletonSvgTransition;

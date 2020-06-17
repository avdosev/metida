// нужно для корректного распознавание css модулей

declare module '*.scss' {
    const content: {[className: string]: string};
    export default content;
}

declare module '*.css' {
    const content: {[className: string]: string};
    export default content;
}


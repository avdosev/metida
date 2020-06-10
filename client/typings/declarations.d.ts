// нужно для корректного распознавание css модулей

declare module '*.css' {
    const content: {[className: string]: string};
    export default content;
}
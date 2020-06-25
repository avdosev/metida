import React from 'react';
// TODO тут надо написать фунцию, которая соберет все дефолтные импорты из вложенных папок и экспорнет их

// const cache = {key: ''};
//
// function importAll (r: any) {
//     console.log(r)
//     // @ts-ignore
//     r.keys().forEach( (key: any) => cache[key] = r(key));
// }
//
// importAll(require.context(".", true, /\.tsx$/));

function requireAll(r: any) {
    r.keys().forEach(r);
}
requireAll(require.context('/^\\.\\/.*$/', true, /\.tsx$/));
// https://webpack.js.org/guides/dependency-management/

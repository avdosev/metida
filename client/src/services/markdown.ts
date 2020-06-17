import {highlighter} from "./highlighter";
const md = require('markdown-it')


export default md({
    highlight: highlighter,
    html: true,
    linkify: true,
    typographer: true
});


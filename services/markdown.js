const md = require('markdown-it')({
    html: false,
    linkify: true,
    typographer: true
});

function MarkdownToHtml(str) {
    return md.render(str);
}

module.exports = {
    MarkdownToHtml
}
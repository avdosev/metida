const md = require('markdown-it')({
    html: false,
    linkify: true,
    typographer: true
});

// меняем правила игры
md.renderer.rules.table_open = () => { return '<pre class="pre_table"><div class="scroll_inner_pre"><table>'}
md.renderer.rules.table_close = () => { return '</table></div></pre>'}

function MarkdownToHtml(str) {
    return md.render(str);
}

module.exports = {
    MarkdownToHtml
}
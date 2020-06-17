const hljs = require("highlight.js/lib/core");  // так можно выбрать конкретные языки
import 'highlight.js/styles/vs2015.css'

// TODO  можно поробовать определять на этапе открытия статьи, какой там код используется, и подгрузить нужный
// но не сегодня

// полный список ищи либо в их доке, либо в исходниках
// а также можно сделать для каждого пользователя отдельную кнопку при использовании языка - тип установить нужный язык, будет охуенно
const languages = [
    "bash", "c-like", "cpp", "csharp", "sql", "css", "dart", "dockerfile", "javascript", "java", "php", "python"
]

for (const language of languages) {
    hljs.registerLanguage(language, require(`highlight.js/lib/languages/${language}`));
}

export function highlighter(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
        try {
            return hljs.highlight(lang, str).value;
        } catch (__) {}
    }
    return 'Укажите язык, который вы используете. Пока доступны ' + languages.toString() + "."; // use external default escaping
}


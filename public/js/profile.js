import { insertPostPreview } from "./modules/articles.js"

const username = document.querySelector('.profile').attributes.username.value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(username)
    getArticles()
});

function getArticles() {
    fetch(`/api/author/${username}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(value => {
        console.log(value)
        return value.json()
    }).then((json => {
        const insertElem = document.querySelector('.lenta')
        const articles = json.articles;
        for (let i = 0; i < articles.length; i++) {
            if (articles[i] == undefined) {
                console.error("Все");
                break
            }
            insertPostPreview(articles[i], insertElem);
        }
    })).catch(error => {
        console.error(error);
    })
}




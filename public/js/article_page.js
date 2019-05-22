console.log("слышъ, писать статью")

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById("previews");
    const textarea = document.querySelector('#article')
    const header = document.querySelector('#header')
    const disclaimer = document.querySelector('#disclaimer')
    
    checkbox.addEventListener("click", showArtIfCheckboxCheked)
    textarea.addEventListener('change', showArtIfCheckboxCheked)
    header.addEventListener('change', showArtIfCheckboxCheked)

    header.addEventListener("input", () => {
        
    })

    function showArtIfCheckboxCheked() {
        let headerStr = '', textStr = '';
        
        if (checkbox.checked) {
            headerStr = document.getElementById('header').value
            textStr = document.getElementById('article').value
        }
        
        showArticle(headerStr, textStr)
    }
});


function showArticle(title, text) {
    const post_text = document.getElementsByClassName('post_text')[0]
    post_text.innerHTML = `<h1>${title}</h1>${text}`;
}
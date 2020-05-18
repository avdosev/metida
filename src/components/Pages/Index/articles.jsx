
export function insertPostPreview(objPost, insertedElem) {
    const url = `/post/${objPost.id}`;
    const htmlPost = `
    <div class = "post">
        <div class="title">
            <a href = "${url}"><h3>${objPost.header}</h3></a>
        </div>
        <div class="disclaimer">
            <p>${objPost.disclaimer}</p>
        </div> 
        <div class="after_post">
            <a href="${url}" class="BtnToArticle">Читать дальше</a>
            <a href="${url+"#comments"}" class="BtnToArticleComments">
                <img class="after_post_icon" src="/public/img/ui_icon/comment.svg">
            </a>
        </div>
    </div>
    `;
    insertedElem.insertAdjacentHTML("beforeend", htmlPost);
}
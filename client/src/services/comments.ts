import { get } from './router';

/**
 * из данных в хтмл/url получаем айдишник статьи
 */
export function getArticleId(): string {
    const url = window.location.href.split('/');
    return url[url.length - 1];
}

/**
 * загрузка комментов
 */
export async function loadComments(post_id: string | number) {
    return await get(`/api/post/${post_id}/comments`);
}

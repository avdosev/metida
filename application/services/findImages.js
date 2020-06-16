import imageminMozjpeg from "imagemin-mozjpeg";
const imagemin = require('imagemin');
// распарсить текст на наличие jpg картинок (потом можно и для всех остальных)
//получаем статью, пытаемся достать оттуда по md регулярке ссылку на изображение.
// скачиваем это изображение к себе.
// подаем в программу конвертации, например jpg -> pjpg.
// заливаем на какой-нибудь хост для картинок.
export function findImages(req, res, next) {

    let JPEGImages = []
    // (async () => {
    //     await imagemin(['images/*.jpg'], 'build/images', {
    //         use: [
    //             imageminMozjpeg()
    //         ]
    //     });
    //
    //     console.log('Images optimized');
    // })();
}

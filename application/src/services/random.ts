
function stringGenerator(len: number) {
    const chrs = 'ab deh kmnp swxzA BD EF GHK MNPQR STWX Z123 4567 89';
    var str = '';
    for (let i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}

function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}


export {
    stringGenerator,
    randInt
}
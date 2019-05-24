
function stringGenerator(len) {
    const chrs = 'ab deh kmnp swxzA BD EF GHK MNPQR STWX Z123 4567 89';
    var str = '';
    for (var i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = {
    stringGenerator,
    randInt
}
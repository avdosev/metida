
function stringGenerator(len) {
    const chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    var str = '';
    for (var i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}

function randInt(min, max) {
    return Math.random() * (max - min) + min;
}


module.exports = {
    stringGenerator,
    randInt
}
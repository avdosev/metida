import { highLighter } from "./modules/highlighter.js";
import { getData } from "./modules/helper.js";

// тупа хайлайт кода
async function highlighting() {
    const elems = document.querySelectorAll('code');
    if (!elems) {
        return;
    }
    
    const lexTable = await getData('/public/json/lexem_table.json')
    for (let i = 0; i < elems.length; i++) {
        elems[i].innerHTML = highLighter(elems[i].innerText, lexTable);
    }
    
}

highlighting();
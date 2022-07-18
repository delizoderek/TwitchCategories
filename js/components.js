const streamerCard = ''
const categoryHeader = ''

function htmlMarkupToNode(html){
    let template = document.createElement("template");
    template.innerHTML = html ;
    let node = template.content.cloneNode(true) ;
    return node ;
}

document.getElementById("divOne").appendChild(htmlMarkupToNode("<table><tbody><tr><td><input type='text' value='0' /></td></tr></tbody></table>"));
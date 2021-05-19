

const utils = {
  // 提供插入富文本的能力 
  html(htmlStr){
    let div = document.createElement("div");
    div.innerHTML = htmlStr;
    return [...div.childNodes];
  },

}
export default utils;


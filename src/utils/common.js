/* ** 通用工具方法
todo: 持续功能分类拆分
*/

// 解析富文本 提供插入富文本的能力 
export function parseRichText(htmlStr){
  let div = document.createElement("div");
  div.innerHTML = htmlStr;
  return [...div.childNodes];
} 
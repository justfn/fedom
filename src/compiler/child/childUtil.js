import { 
  isEmptyValue, 
} from "../../utils/judge.js";


/* 填充子节点 
*/
export function fillNodeChild(parentNode, node){
  parentNode.appendChild(node);
  return node;
} 

/* 处理文本值 
*/
export function trimTextValue(val){
  if (isEmptyValue(val)) { return ''; }
  
  let rst = val+'';
  // 去掉空格 
  return rst.trim();
} 
/* 填充文本节点
*/
export function fillTextChild(parentNode, text){
  text = trimTextValue(text);
  let txtNode = document.createTextNode(text);
  parentNode.appendChild(txtNode);
  return txtNode;
} 

/* ** 标记列表起始位置 
*/
export function markListStart(parentNode){
  let commentNode = document.createComment("fedom: start of array child for position");
  parentNode.appendChild(commentNode);
  return commentNode;
} 




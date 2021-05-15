/* ** 控制组件/元素是否显示 */
import { 
  isCommentNode, 
  isVaryValue, 
} from "../../utils/judge.js";

const global_config = {
  keyName: 'varyShow',
}
export default function varyAttrVaryShow(realNode, attrs){
  if (!(global_config.keyName in attrs)) { return ; }
  if (isCommentNode(realNode)) { return ; }
  
  let originAttrVal = attrs[global_config.keyName];
  let attrVal = originAttrVal;
  let orginDisplay = realNode.style.display;
  if (orginDisplay==='none') { orginDisplay = ''; }
  if (isVaryValue(originAttrVal)) { 
    attrVal = attrVal.$$; 
    originAttrVal._add_set(({ preTrimedValue, nxtTrimedValue })=>{
      realNode.style.display = nxtTrimedValue ? orginDisplay : 'none';
    })
  }
  realNode.style.display = attrVal ? orginDisplay : 'none';
  delete attrs[global_config.keyName];
  // return attrs;
} 


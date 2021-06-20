import { devLog, } from "../../utils/dev.js";
import { trimTextValue, } from "../../compiler/child/childUtil.js";
import { 
  isStringValue, 
  isNumberValue, 
  isNodeValue, 
  isArrayValue, 
  isTextValue, 
  isVaryList,
} from "../../utils/judge.js";


/* 子节点可变 
*/
export default function varyChildValue(params={}){
  let {
    // fdNode, 
    varyChild, 
    patchNodeForText, 
    patchNodeForList, 
  } = params; 
  if (!varyChild) { return ; }
  // return ;
  
  /* ** 补偿更新Node节点  
  1 设置文本字符串作为子节点时,初始渲染后,第二次更新无法通过文本定位该文本节点 
  需在首次渲染后,将文本节点进行补偿替换 
  2 空数组子节点首次渲染时,将无实体节点插入,使用注释节点占位,该注释节点作为补偿节点存储 
  */
  varyChild._mounted_run(varyChild);
  varyChild._add_set((setParams)=>{
    let {
      preTrimedValue, 
      nxtTrimedValue, 
      preValue, 
      nxtValue, 
    } = setParams; 
    if ( isArrayValue(preTrimedValue) ) {
      const patchObj = updateListChild({
        listChild: preTrimedValue, 
        startFlgNode: patchNodeForList, 
        newChild: nxtTrimedValue,
      })
      patchNodeForText = patchObj.txtPatch;
      patchNodeForList = patchObj.arrPatch;
      return ;
    }
    
    if ( isNodeValue(preTrimedValue) ) {
      const patchObj = updateNodeChild({
        nodeChild: preTrimedValue, 
        newChild: nxtTrimedValue,
      })
      patchNodeForText = patchObj.txtPatch;
      patchNodeForList = patchObj.arrPatch;
      return ;
    }
    
    preTrimedValue = preTrimedValue + '';
    const patchObj = updateTextChild({
      textFlgChild: patchNodeForText, 
      newChild: nxtTrimedValue,
    })
    patchNodeForText = patchObj.txtPatch;
    patchNodeForList = patchObj.arrPatch;
    // if ( isTextValue(preTrimedValue) ) { }
    // console.log('### to_do: childVary');
    // console.log('preTrimedValue', preTrimedValue);
    // return ;
  })
  if (isVaryList(varyChild) && patchNodeForList ) {
    // 插入操作 
    varyChild._add_list_in(({index, list})=>{
      let len = varyChild.$$.length; 
      let itmNode = findPositionNode(patchNodeForList, index);
      itmNode = itmNode || patchNodeForList; 
      list.forEach((itm,idx)=>{
        let childNode = itm; 
        if ( itm && itm.realNode ) { childNode = itm.realNode; }
        refreshNode({
          positionNode: itmNode, 
          childNode, 
          oldChildNode: null,
        })
      })
    })
    
    // 删除操作 
    varyChild._add_list_rm(({index})=>{
      let itmNode = findPositionNode(patchNodeForList, index+1);
      refreshNode({
        positionNode: itmNode, 
        childNode: false, 
        oldChildNode: itmNode,
      })
    })
  }
} 



function updateListChild({ listChild, startFlgNode, newChild, }){
  let pNode = startFlgNode.parentNode;
  // to_do 待优化: 移除旧节点 
  listChild.forEach((itm,idx)=>{ pNode.removeChild(startFlgNode.nextSibling); })
  // 插入新节点 
  if (isArrayValue(newChild)) {
    let flgNode = startFlgNode;
    newChild.forEach((itm,idx)=>{
      flgNode = refreshNode({
        positionNode: flgNode, 
        childNode: itm, 
        oldChildNode: null,
      })
    })
    return {
      txtPatch: null,
      arrPatch: startFlgNode,
    };
  }
  if (isTextValue(newChild)) {
    let txtPatch = refreshNode({
      positionNode: startFlgNode, 
      childNode: newChild, 
      oldChildNode: startFlgNode,
    })
    return {
      txtPatch,
      arrPatch: null,
    }
  }
  if (isNodeValue(newChild)) {
    refreshNode({
      positionNode: startFlgNode, 
      childNode: newChild, 
      oldChildNode: startFlgNode,
    })
    return {
      txtPatch: null,
      arrPatch: null,
    }
  }
  
  console.error('error: updateListChild')
} 
function updateTextChild({ textFlgChild, newChild }){
  if (isNodeValue(newChild) ) {
    refreshNode({
      positionNode: textFlgChild, 
      childNode: newChild, 
      oldChildNode: textFlgChild,
    })
    return {
      txtPatch: null, 
      arrPatch: null,
    };
  }
  
  if (isArrayValue(newChild)) {
    let arrPatch = document.createComment("fedom: start of array child for position");
    refreshNode({
      positionNode: textFlgChild, 
      childNode: arrPatch, 
      oldChildNode: textFlgChild,
    });
    let flgNode = arrPatch;
    newChild.forEach((itm,idx)=>{
      flgNode = refreshNode({
        positionNode: flgNode, 
        childNode: itm, 
        oldChildNode: null,
      });
    })
    return {
      txtPatch: null, 
      arrPatch,
    };
  }
  
  // if (isTextValue(newChild) ) { }
  newChild = newChild + ''
  newChild = refreshNode({
    positionNode: textFlgChild, 
    childNode: newChild, 
    oldChildNode: textFlgChild,
  })
  return {
    txtPatch: newChild, 
    arrPatch: null,
  };
} 
function updateNodeChild({ nodeChild, newChild }){
  // let pNode = nodeChild.parentNode;
  if (isNodeValue(newChild)) {
    refreshNode({
      positionNode: nodeChild, 
      childNode: newChild, 
      oldChildNode: nodeChild,
    })
    return {
      txtPatch: null, 
      arrPatch: null,
    };
  }
  
  if (isTextValue(newChild)) {
    newChild = refreshNode({
      positionNode: nodeChild, 
      childNode: newChild, 
      oldChildNode: nodeChild,
    })
    return {
      txtPatch: newChild, 
      arrPatch: null,
    };
  }
  
  if (isArrayValue(newChild)) {
    let arrPatch = document.createComment("fedom: start of array child for position");
    refreshNode({
      positionNode: nodeChild, 
      childNode: arrPatch, 
      oldChildNode: nodeChild,
    });
    let flgNode = arrPatch;
    newChild.forEach((itm,idx)=>{
      flgNode = refreshNode({
        positionNode: flgNode, 
        childNode: itm, 
        oldChildNode: null,
      })
    })
    return {
      txtPatch: null, 
      arrPatch: arrPatch,
    };
  }
} 
function refreshNode({ positionNode, childNode, oldChildNode, }){
  let parentNode = positionNode.parentNode; 
  if (isTextValue(childNode)) { childNode =  document.createTextNode( trimTextValue(childNode) ); }
  if (childNode) { parentNode.insertBefore(childNode, positionNode.nextSibling); }
  if (oldChildNode) { parentNode.removeChild(oldChildNode); }
  
  return childNode;
} 
function findPositionNode(flgNode, num){
  new Array(num).fill('').forEach((itm)=>{
    // console.log( flgNode );
    if (!flgNode) { return ; }
    
    flgNode = flgNode.nextSibling;
  })
  return flgNode;
} 

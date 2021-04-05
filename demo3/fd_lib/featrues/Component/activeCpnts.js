/* ** 路由内渲染的组件 
*/


let activeList = [];
export function updateActive(fNode){
  let isExit = activeList.some((itm,idx)=>{
    return itm===fNode
  })
  if (!isExit) {
    activeList.push(fNode);
  }
} 


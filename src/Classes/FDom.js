/* dom基类 

*/


class FDom {
  constructor(...arg){ 
  }
  onCreate(){ },
  init(){
    
    return { 
      
    };
  },
  onCreated(){ },
  // 装载 
  onMount(){},
  onMounted(){},
  // 更新  
  onUpdate(){},
  onUpdated(){},
  //   
  onCache(){},
  onCached(){},
  onDelete(){},
  onDeleted(){},
}
module.exports = FDom;

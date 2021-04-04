/* ** 路由页面渲染完毕后的回调  
*/
import { globalWrite, globalRead, } from "../../utils/globalWR.js";
import onHashChange from "../../router/onHashChange.js";

onHashChange(()=>{
  globalWrite('status.isLoaded', false);
})
export default function onPageLoaded(fNode, num, callback){
  // to_do: 待优化 
  setTimeout(()=>{
    if (
      fNode.realNode.parentElement!==globalRead('elems.root') 
      || globalRead('status.isLoaded')
    ) { return ; }
    globalWrite('status.isLoaded', true);
    
    globalWrite('status.pageNodeNum', num);
    console.log( num );
    callback && callback();
  })

} 

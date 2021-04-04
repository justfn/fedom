/* ** hashchange 路由切换处理
*/
import { globalWrite, globalRead, } from "../utils/globalWR.js";



/* ** 路由切换钩子 
*/
let listenerList = [];
function onHashChange(listener){
  listenerList.push(listener);
} 

/* ** 路由切换 
*/
function hashchangeListener( evt ){
  globalWrite('status.isLoaded', false);

  listenerList.forEach(fn=>fn(evt))

  // console.log(location.hash);
  // console.log(evt);
  // evt.oldURL: "http://0.0.0.0:9000/#/home"
  // evt.newURL: "http://0.0.0.0:9000/#/tic_tac_toe"
} 

export default onHashChange;
export function initHashChange(){
  window.addEventListener("hashchange", hashchangeListener );
  // 初始执行 
  setTimeout(()=>{ hashchangeListener({ newURL: window.location.href, }) })
} 


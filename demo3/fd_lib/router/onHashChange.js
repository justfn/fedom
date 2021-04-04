/* ** hashchange 路由切换处理
*/
import { globalWrite, globalRead, } from "../utils/globalWR.js";



let isInit = false;
let listenerList = [];


/* ** 路由切换 
*/
function hashchangeListener( evt ){
  // console.log(location.hash);
  // console.log(evt);
  // evt.oldURL: "http://0.0.0.0:9000/#/home"
  // evt.newURL: "http://0.0.0.0:9000/#/tic_tac_toe"

  listenerList.forEach(fn=>fn(evt))
} 

/* ** 监听路由切换 
*/
export default function onHashChange(listener){
  listenerList.push(listener);
} 
export function initHashChange(){
  if (isInit) { return ; }
  isInit = true;
  
  // 初始执行 
  hashchangeListener({ 
    newURL: window.location.href, 
    isInitRun: true,
  });
  window.addEventListener("hashchange", hashchangeListener );
} 


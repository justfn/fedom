/* ** hashchange 路由切换处理
*/

const store = {
  isInitSwitch: false, // 防止多次初始化 
  listenerList: [],
}



/* ** 监听路由切换 
*/
export default function onHashChange(listener){
  store.listenerList.push(listener);
} 

export function initHashChange(hashchangeRun){
  if (store.isInitSwitch) { return ; }
  store.isInitSwitch = true;
  
  window.addEventListener("hashchange", (evt)=>{
    hashchangeRun(evt, (option)=>{
      hashchangeListener(evt, option)
    })
  });
  // 初始执行 
  let evt = {
    newURL: window.location.href, 
    isInitRun: true,
  }
  hashchangeRun( evt, (option)=>{
    hashchangeListener(evt, option)
  });
} 
/* ** 路由切换 
*/
function hashchangeListener( evt, option ){
  // console.log(location.hash);
  // console.log(evt);
  // evt.oldURL: "http://0.0.0.0:9000/#/home"
  // evt.newURL: "http://0.0.0.0:9000/#/tic_tac_toe"
  
  store.listenerList.forEach(fn=>fn(evt, option))
} 


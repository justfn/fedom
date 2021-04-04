/* ** hashchange 路由切换处理
*/
import { globalWrite, globalRead, } from "../utils/globalWR.js";
import render from "../render.js";
import parseHash from "./parseHash.js";
import routerReplace from "./routerReplace.js";

let cached_routes = {
  // <path>: <PageElem>
}; 
function hashchangeListener( evt, routeMap, root, beforeEach ){
  globalWrite('status.isLoaded', false);
  // console.log(location.hash);
  // console.log(evt);
  // evt.oldURL: "http://0.0.0.0:9000/#/home"
  // evt.newURL: "http://0.0.0.0:9000/#/tic_tac_toe"
  
  let oldPathObj = {};
  if (evt.oldURL) {
    let oldPathObj = parseHash(evt.oldURL);
    let oldPathOption = routeMap[oldPathObj.path] ?? {};
    
    // 缓存DOM 
    if (oldPathOption.isCache && oldPathOption.component) {
      cached_routes[oldPathObj.path] = root.lastElementChild;
      if (oldPathOption.alias) { cached_routes[oldPathOption.alias] = root.lastElementChild; }
      // console.log( '缓存html', this._root.lastElementChild );
    }
  }
  
  let pathObj = parseHash(evt.newURL);
  
  let isGo = beforeEach(pathObj, oldPathObj);
  if (!isGo) { 
    console.log('# 阻止路由访问', pathObj, oldPathObj);
    return ; 
  }
  
  if (!pathObj.path) {
    window.location.hash = '/'
    return ;
  }
  
  let pathOption = routeMap[pathObj.path] ?? {};
  Promise.resolve( cached_routes[pathObj.path] )
  // 先读缓存 
  .then((htmlNode)=>{
    // 重定向 
    if (pathOption.redirect) {
      routerReplace(pathOption.redirect, pathObj.query);
      return Promise.reject();
    }
    
    // 出口1：读缓存 
    if (htmlNode) { 
      let isExit = [ ...root.childNodes ].some((itm,idx)=>{
        return itm === htmlNode;
      })
      if (isExit) { 
        // console.log('# 不重复渲染相同DOM', htmlNode);
        return Promise.reject(); 
      }
      
      root.innerHTML = '';
      // console.log('# 加载缓存', htmlNode);
      render( htmlNode, root );
      return Promise.reject();
    }
    // 出口2：报错 
    if (!pathOption.component) { 
      return Promise.reject(`${pathObj.path} 路由，无页面组件！`); 
    }
    // 出口3：渲染组件 
    return pathOption.component(); 
  })
  // 再解析渲染 
  .then((module)=>{
    let Cpt = module.default;
    root.innerHTML = '';
    render( <Cpt />, root )
  })
  .catch((err)=>{
    if (err) { console.error(err); }
  })

} 

export default function onHashChange(routeMap, root, beforeEach){
  // 初始执行 
  hashchangeListener({ 
    newURL: window.location.href, 
  }, routeMap, root, beforeEach)
  window.addEventListener("hashchange", (evt)=>{
    hashchangeListener(evt, routeMap, root, beforeEach)
  });
  
  return {
    cached_routes,
  };
} 



import { globalWrite, globalRead, } from "../utils/globalWR.js";
import formatRoutes from "./formatRoutes.js";
import parseHash from "./parseHash.js";
import onHashChange, { initHashChange, } from "./onHashChange.js";
import routerPush from "./history/push.js";
import routerReplace from "./history/replace.js";
import routerComponentProps from "./routerComponentProps.js";
import cachePage from "./cachePage.js";
import render from "../render.js";
import {
  isFunctionValue, 
} from "../utils/judge.js";


const store = {
  // 配置的所有路由集合 
  routeList: [],
  // 
  activedPath: '',
  // 
  pathFNdsMap: {
    // <path>: <fNdList>, 
  },
}
export default class Router {
  constructor(routeOptions = {}){ 
    const {
      routes = [
        // {
        //   path: '',
        //   alias: '',
        //   redirect: '',
        //   component: <cpt>,
        //   isCache: <bol>,
        //   children: [
        //     {
        //       path: '', // 是否以 / 开头都无区别
        //       ...
        //     },
        //     ...
        //   ],
        // },
      ],
      root = document.body,
      beforeEach = (v=>v),
    } = routeOptions;
    let {
      routeMap,
      routeList,
    } = formatRoutes(routes);
    store.routeList = routeList;
    // 路由Map
    this._route_map = routeMap;
    this._root = root; 
    this._beforeEach = beforeEach;
    
    // onHashChange(  );
    initHashChange(this._hashChange);
  }
  // update_cache = (path, isCache)=>{ }
  
  _hashChange = (evt, callback)=>{
    // console.log(" >>>>>>>>>>>>>> ", 'hash change');
    callback = callback || (v=>v);
    let oldPathParams = parseHash(evt.oldURL);
    let newPathParams = parseHash(evt.newURL);
    
    store.activedPath = newPathParams.path; 
    updatePathComponentFNdsMap(this._route_map);
    
    callback({
      init: !!evt.isInitRun,
      type: 'start',
      oldPathParams, 
      newPathParams, 
    });
    
    
    // hash路由错误 
    if (!newPathParams.path) {
      window.location.hash = '/';
      return ;
    }
    
    // 不允许跳转 
    let isGo = this._beforeEach(oldPathParams, newPathParams) ?? true;
    if (!isGo) { 
      fd_dev_log('不允许访问');
      routerReplace(oldPathParams.path, oldPathParams.query);
      return ; 
    }
    
    // 路由重定向 
    let pathOption = this._route_map[newPathParams.path] ?? {};
    if (pathOption.redirect) {
      routerReplace(pathOption.redirect, newPathParams.query);
      return ;
    }
    
    // 使用缓存页面 
    let cachedPageMap = cachePage(this._route_map, oldPathParams, this._root.lastElementChild );
    let cachedPageNode = cachedPageMap[ newPathParams.path ];
    if (cachedPageNode) { 
      let isExit = [ ...this._root.childNodes ].some( itm=>itm===cachedPageNode )
      // 不重复渲染相同DOM 
      if (isExit) { 
        fd_dev_log('cache page: 不重复渲染相同DOM ');
        return; 
      }
      
      this._root.innerHTML = '';
      callback({
        init: !!evt.isInitRun,
        type: 'cache',
        oldPathParams, 
        newPathParams, 
      });
      render( cachedPageNode, this._root );
      callback({
        init: !!evt.isInitRun,
        type: 'cached',
        oldPathParams, 
        newPathParams, 
      });
      return ;
    }
    
    // 未指定需渲染的页面组件 
    if (!pathOption.component) { 
      console.warn('render error: 未指定页面组件');
      routerReplace(oldPathParams.path, oldPathParams.query);
      return; 
    }
    
    // 渲染指定页面组件 
    pathOption.component().then(module=>{
      this._root.innerHTML = '';
      callback({
        init: !!evt.isInitRun,
        type: 'render',
        oldPathParams, 
        newPathParams, 
      });
      try {
        let ShowComponent = module.default;
        render( 
          // ShowComponent({},{html(){return <div/>;}}), // todo 
          <ShowComponent {...routerComponentProps(oldPathParams, newPathParams, cachedPageMap)} />, 
          this._root 
        );
        callback({
          init: !!evt.isInitRun,
          type: 'renderred',
          oldPathParams, 
          newPathParams, 
        });
      } 
      catch (err) {
        callback({
          init: !!evt.isInitRun,
          type: 'render-error',
          oldPathParams, 
          newPathParams, 
        });
      } 
    })
    .catch((err)=>{
      console.log('todo: 待处理场景', err);
    })
  }
  
  /* --------------------------------------------------------- 工具方法 */
  push = routerPush;
  replace = routerReplace;
  routes = getRoutes(true);
}
// 路由组件映射 
export function updatePathComponentFNdsMap(routeMap){
  let routeOption = routeMap[store.activedPath] || {};
  if ( !routeOption.component ) { return ; }
  let isCache = routeOption.isCache;
  if ( isFunctionValue(isCache) ) { isCache = isCache(); }
  if ( isCache ) { return ; }
  
  store.pathFNdsMap[store.activedPath] = [];
} 
export function updateActiveComponentFNodes(fNd){
  let list = store.pathFNdsMap[store.activedPath];
  if (!list) { 
    store.pathFNdsMap[store.activedPath] = []; 
    list = store.pathFNdsMap[store.activedPath];
  }
  
  let isExit = list.some((itm,idx)=>{ return itm===fNd; });
  if (!isExit) { list.push(fNd); }
} 
export function getActiveComponentFNodes(path){
  path = path || store.activedPath;
  return store.pathFNdsMap[path] || [];
} 

/* 对外接口 ===================================================================*/
export function getRoutes(isOrgin=false){
  if (isOrgin) { return [...store.routeList];  }
  
  // todo 待优化 
  return JSON.parse(JSON.stringify(store.routeList));
}




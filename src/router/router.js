
import Route, { parseHash, } from "./route.js";
import onHashChange, { initHashChange, } from "./onHashChange.js";
import { hashReplace, } from "./changeRoute.js";
import cacheRoutePage from "./cacheRoutePage.js";
import render from "../compiler/render.js";
import {
  isFunctionValue, 
  isPromiseValue, 
} from "../utils/judge.js";

const msg_cfg = {
  notgo: '不允许访问的路由',
  cachepage: 'cache page, 不重复渲染相同DOM',
}
// 配置的所有路由集合 
let route_list = [];
// 路由响应开关 
let is_miss_hash_change = false;
// 路由记录 
let pre_hash_url = '';
let active_hash_url = '';
// 路由组件节点映射 
let hashpath_fnods_map = {
  // <path>: <fNdList>, 
}
// 格式化传入的路由配置 
function formatRoutes(routes, prePath='', routeMap={}, routeList=[]){
  routes.forEach((pathOption,idx)=>{
    let pathKey = pathOption.path;
    if ( !/^\//.test(pathKey) ) { pathKey = `/${pathKey}`; }
    pathKey = prePath + pathKey;
    if (pathOption.alias) {
      let _opt = { ...pathOption }
      routeMap[_opt.alias] = _opt;
      pathOption = _opt;
    }
    routeMap[pathKey] = pathOption;
    routeList.push({
      ...pathOption,
      path: pathKey,
    })
    let children = pathOption.children;
    if (children) {
      formatRoutes(children, pathKey, routeMap, routeList)
    }
  })
  return {
    routeMap: routeMap,
    routeList: routeList,
  };
}
// 清空路由组件集合 
function clearActivedList(routeOption, listMap, activeHash ){
  routeOption = routeOption || {};
  if ( !routeOption.component ) { return ; }
  let isCache = routeOption.isCache;
  if ( isFunctionValue(isCache) ) { isCache = isCache(); }
  if ( isCache ) { return ; }
  
  listMap[ activeHash ] = [];
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
        //       path: '', // 降低复杂度,是否以 / 开头都无区别
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
    route_list = routeList;
    // 路由Map
    this._route_map = routeMap;
    this._root = root; 
    this._beforeEach = beforeEach;
    
    // onHashChange(  );
    initHashChange(this._hashChange);
  }
  /* ** 处理路由，将路由Map化 
  返回格式化后的 routeMap 
  */
  // update_cache = (path, isCache)=>{ }
  
  _hashChange = (evt, callback)=>{
    if (is_miss_hash_change) { return ; }
    
    // console.log(" >>>>>>>>>>>>>> ", 'hash change');
    callback = callback || (v=>v);
    let oldPathParams = parseHash(evt.oldURL);
    let newPathParams = parseHash(evt.newURL);
    
    active_hash_url = newPathParams.path; 
    clearActivedList(this._route_map[active_hash_url], hashpath_fnods_map, active_hash_url);
    
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
      console.log(msg_cfg.notgo, oldPathParams.path);
      hashReplace(oldPathParams.path, oldPathParams.query);
      return ; 
    }
    
    // 路由重定向 
    let pathOption = this._route_map[newPathParams.path] ?? {};
    if (pathOption.redirect) {
      hashReplace(pathOption.redirect, newPathParams.query);
      return ;
    }
    
    // 使用缓存页面 
    let cachedPageMap = cacheRoutePage(this._route_map, oldPathParams, this._root.firstElementChild );
    let cachedPageNode = cachedPageMap[ newPathParams.path ];
    if (cachedPageNode) { 
      let isExit = [ ...this._root.childNodes ].some( itm=>itm===cachedPageNode )
      // 不重复渲染相同DOM 
      if (isExit) { 
        console.log(msg_cfg.cachepage);
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
      hashReplace(oldPathParams.path, oldPathParams.query);
      return; 
    }
    
    // 渲染指定页面组件 
    let promise = Promise.resolve({});
    let cpntOptResult = pathOption.component(newPathParams, oldPathParams);
    let PageCpnt = cpntOptResult;
    if ( isPromiseValue(cpntOptResult) ) { 
      // console.log('异步组件');
      promise = cpntOptResult 
      PageCpnt = null;
    }
    
    promise.then(module=>{
      this._root.innerHTML = '';
      callback({
        init: !!evt.isInitRun,
        type: 'render',
        oldPathParams, 
        newPathParams, 
      });
      try {
        PageCpnt = PageCpnt || module.default;
        render( 
          <PageCpnt />, 
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
}

/* -------------------------------------------------------- 对外接口 */
// 是否不响应路由变化 
export function missHashChange(isMiss=true){
  is_miss_hash_change = isMiss;
} 
// 收集当前路由下的组件  
export function updateActivedList(fNd){
  let list = hashpath_fnods_map[ active_hash_url ];
  if (!list) { 
    hashpath_fnods_map[ active_hash_url ] = []; 
    list = hashpath_fnods_map[ active_hash_url ];
  }
  
  let isExit = list.some((itm,idx)=>{ return itm===fNd; });
  if (!isExit) { list.push(fNd); }
} 
// 获取当前路由下的组件 
export function getActivedList(path){
  path = path || active_hash_url;
  return hashpath_fnods_map[path] || [];
} 
// 获取所有配置的路由 
export function getRoutes(isOrgin=false){
  if (isOrgin) { return [...route_list];  }
  
  // todo 待优化 
  return JSON.parse(JSON.stringify( route_list ));
}
// 获取之前的hash路由 
export function getPreRoute(){
} 



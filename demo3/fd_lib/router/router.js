
import { render, } from "../index.js";

const _routes = [];
export default class Router {
  constructor(routeOptions = {}){ 
    const {
      routes = {},
      root = document.body,
    } = routeOptions;
    // 路由Map
    this._route_map = this._dealRoutes(routes);
    this._root = root; 
    this._cached_routes = {
      // <path>: <Page>
    };
    
    this._hashchangeListener({
      newURL: window.location.href, 
    })
    window.addEventListener("hashchange", this._hashchangeListener);
  }
  
  $update_cache = (path, isCache)=>{ }
  
  // 处理路由，将路由Map化 
  _dealRoutes = (routes, routeMap={}, prePath='' )=>{
    for(let pathKey in routes){
      let pathOption = routes[pathKey];
      if ( !/^\//.test(pathKey) ) {
        if (prePath!=='/') { prePath += '/' }
        pathKey = `${prePath}${pathKey}`;
      }
      routeMap[pathKey] = pathOption;
      _routes.push({
        ...pathOption,
        path: pathKey,
      })
      if (pathOption.alias) {
        routeMap[pathOption.alias] = pathOption;
      }
      let children = pathOption.children;
      if (children) {
        this._dealRoutes(children, routeMap, pathKey)
      }
    };
    return routeMap;
  }
  // 路由变换监听  
  _hashchangeListener = (evt)=>{
    // console.log(location.hash);
    // console.log(evt);
    // evt.oldURL: "http://0.0.0.0:9000/#/home"
    // evt.newURL: "http://0.0.0.0:9000/#/tic_tac_toe"
    if (evt.oldURL) {
      let oldPathObj = this._getHashPathObj(evt.oldURL);
      let oldPathOption = this._route_map[oldPathObj.path] ?? {};
      
      // 缓存DOM 
      if (oldPathOption.isCache) {
        this._cached_routes[oldPathObj.path] = this._root.lastElementChild;
        if (oldPathOption.alias) {
          this._cached_routes[oldPathOption.alias] = this._root.lastElementChild;
        }
        // console.log( '缓存html', this._root.lastElementChild );
      }
    }
    
    let pathObj = this._getHashPathObj(evt.newURL);
    if (!pathObj.path) {
      window.location.hash = '/'
      return ;
    }
    
    let pathOption = this._route_map[pathObj.path] ?? {};
    Promise.resolve( this._cached_routes[pathObj.path] )
    // 先读缓存 
    .then((htmlNode)=>{
      // 读缓存 
      if (htmlNode) { 
        let isExit = [ ...this._root.childNodes ].some((itm,idx)=>{
          return itm === htmlNode;
        })
        if (isExit) { 
          // console.log('# 不重复渲染相同DOM', htmlNode);
          return Promise.reject(); 
        }
        
        this._root.innerHTML = '';
        // console.log('# 加载缓存', htmlNode);
        render( htmlNode, this._root );
        return Promise.reject();
      }
      
      // 
      if (pathOption.redirect) {
        $replace(pathOption.redirect,pathObj.query);
        return Promise.reject();
      }
      if (!pathOption.component) { return Promise.reject(); }
      
      // 渲染组件  
      return pathOption.component(); 
    })
    // 再解析渲染 
    .then((module)=>{
      let Cpt = module.default;
      this._root.innerHTML = '';
      render( <Cpt />, this._root )
    })
    .catch((err)=>{
      if (err) { console.error(err); }
    })
  }
  // 解析路由参数 
  _getHashPathObj = (fullUrl)=>{
    let result = {
      path: '',
      query: {},
      hash: '',
    }
    let hash = fullUrl.split('#')[1];
    if (!hash) { return result; }
    
    let [path, queryMore] = hash.split('?');
    result.path = path;
    if ( queryMore ) {
      let [ query, hash ] = queryMore.split('#');
      query.split('&').forEach((itm,idx)=>{
        let [key, val] = itm.split('=')
        result.query[key] = val ?? '';
      })
      if (hash) {
        result.hash = hash;
      }
    }
    
    return result;
  }
  
}


// 拼接路由参数 
function _jointHashPath(path,obj,isFull=true){
  let url = '';
  if (isFull) {
    const { origin, pathname, search, } = window.location;
    let basePath = origin+pathname+search;
    url = basePath 
  }
  url += `#${path}`;
  let qry = '';
  let keyNum = 0; 
  for(let key in obj){
    keyNum++;
    let val = obj[key];
    qry += `&${key}=${val}`
  };
  if (keyNum>0) { 
    qry = '?' + qry.slice(1) 
  }
  return url + qry;
} 
/* 对外接口 ===================================================================*/
export function $push(path,queryObj={}){
  let url = _jointHashPath(path,queryObj);
  // location.hash = _jointHashPath(path,queryObj,false);
  location.assign(url)
} 
export function $replace(path,queryObj={}){
  let url = _jointHashPath(path,queryObj);
  location.replace(url);
} 
export function $getRoutes(isOrgin=false){
  if (isOrgin) { return [..._routes];  }
  
  // todo 待优化 
  return JSON.parse(JSON.stringify(_routes));
}















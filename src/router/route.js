/* ** 路由对象 
*/

export default class Route {
  constructor(url, option){ 
    // 路由地址 
    this.url = url; 
    // 路由配置 
    this.option = option;
  }
  
}


/* ** 解析hash部分的内容
*/
export function parseHash(fullUrl){
  fullUrl = fullUrl || window.location.href; 
  
  let result = {
    path: '',
    query: {},
    hash: '', // hash后的hash 
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
    if (hash) { result.hash = hash; }
  }
  
  return result;
}

/* ** 组装hash路由参数 
*/
export function joinHash(hashPath, hashQuery, isFull=true){
  let url = '';
  if (isFull) {
    const { origin, pathname, search, } = window.location;
    let basePath = origin+pathname+search;
    url = basePath 
  }
  url += `#${hashPath}`;
  let qry = '';
  let keyNum = 0; 
  for(let key in hashQuery){
    keyNum++;
    let val = hashQuery[key];
    qry += `&${key}=${val}`
  };
  if (keyNum>0) { 
    qry = '?' + qry.slice(1) 
  }
  return url + qry;
} 

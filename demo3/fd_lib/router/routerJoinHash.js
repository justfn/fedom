/* ** 组装hash路由参数 
*/

export default function routerJoinHash(path, obj, isFull=true){
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


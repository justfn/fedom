/* ** 解析hash部分的内容路  
*/

export default function parseHash(fullUrl){
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



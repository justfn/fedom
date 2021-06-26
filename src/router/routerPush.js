import routerJoinHash from "./routerJoinHash.js";


export default function routerPush(path, queryObj={}){
  let url = routerJoinHash(path,queryObj);
  // log('push', url);
  location.hash = routerJoinHash(path, queryObj, false);
  // location.assign(url)
} 

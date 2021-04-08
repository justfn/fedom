import routerJoinHash from "./routerJoinHash.js";

export default function routerReplace(path,queryObj={}){
  let url = routerJoinHash(path, queryObj);
  // log('replace', url)
  location.replace(url);
} 

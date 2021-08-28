/** 改变路由的相关方法 
*/
import {
  isNumberValue,
} from "../utils/judge.js";
import routerJoinHash from "./routerJoinHash.js";
import { missHashChange, } from "./router.js";



// 
export function hashPush(hashPath, hashQuery={}){
  missHashChange(false);
  let url = routerJoinHash(hashPath, hashQuery);
  // log('push', url);
  location.hash = routerJoinHash(hashPath, hashQuery, false);
  // location.assign(url)
} 


// 
export function hashReplace(hashPath, hashQuery={}){
  missHashChange(false);
  let url = routerJoinHash(hashPath, hashQuery);
  // log('replace', url)
  location.replace(url);
} 


// 
export function historyForward(){
  missHashChange(false);
  window.history.forward();
} 
export function historyBack(){
  missHashChange(false);
  window.history.back();
} 
export function historyGo(goNum){
  missHashChange(false);
  goNum = goNum * 1; 
  if ( !isNumberValue(goNum) ) { return console.warn('非数值参数'); }
  if ( !history || !history.go ) { return console.warn('功能不支持'); }
  
  history.go( goNum );
} 


// 回退到指定路由,若不存在则到指定路由,否则直到最开始页面 
// todo 
export function backUntillTo(hashPath, dftHashPath){
  missHashChange();
  history.go(-1);
  console.log( location.hash );
  history.go(-1);
  console.log( location.hash );
  history.go(-1);
  console.log( location.hash );
  
  // missHashChange(false);
}


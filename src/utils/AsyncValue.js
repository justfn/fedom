/* ** 可自身触发状态变化的Promise 
*/
 
export class Async extends Promise {
  constructor(...args){
    super(...args);
  }
}


export default function AsyncValue(){
  let _resolve = null; 
  let _reject = null; 
  let pms = new Async((resolve, reject)=>{
    _resolve = (val)=>{ setTimeout(()=>{ resolve(val) }) };
    // _resolve = resolve;
    _reject = reject;
  });
  pms.resolve = _resolve;
  pms.reject = _reject;
  return pms;
} 

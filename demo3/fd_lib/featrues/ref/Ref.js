
 
export default class Ref extends Promise {
  constructor(...args){
    super(...args);
  }
}


export function RefValue(){
  let _resolve = null; 
  let _reject = null; 
  let pms = new Ref((resolve, reject)=>{
    _resolve = resolve;
    _reject = reject;
  });
  pms._resolve = _resolve;
  pms._reject = _reject;
  return pms;
} 
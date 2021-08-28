// 编译空间打标, 便于css隔离使用  


// 编译空间打标, 便于css隔离使用  
const compiler_queue = []; 
const scope_flag = 'data-fd-scope';
let queue_dft_num = 0; 
let current_scope = '';
export function scopeMark(attrs){
  attrs[scope_flag] = current_scope;
} 
export function preParse( tagName ){
  let scopeName = tagName.scopeName || tagName.name || `component${queue_dft_num++}`;
  compiler_queue.unshift( scopeName )
  current_scope = scopeName;
} 
export function nxtParse(){
  compiler_queue.shift();
  current_scope = compiler_queue[0];
} 


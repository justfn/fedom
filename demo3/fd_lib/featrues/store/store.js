


const keys_map = {
  // <store_key>: instance,
}
export default class Store {
  constructor(store_key, options={}){ 
    this.key = store_key;
    this.options = options;
    let {
      // '01'-内存,'02'-sessionStorage, '03'-localStorage [todo]
      cacheType = '01', 
      // 初始值 
      initValue, 
      // 初始是否清除之前的缓存,针对 sessionStorage 和 localStorage  
      isInitClear = false, 
      // 超时时间,单位:s , 针对 localStorage 
      timeout = 24 * 60 * 60,
      // 格式化函数 
      trim = function(val){ return val; },
    } = options || {};
    this.cacheType = cacheType;
    this.initValue = initValue;
    this.isInitClear = isInitClear;
    this.timeout = timeout;
    this.trim = trim;
    this.value = initValue;
    // 缓存格式化的值 
    this._trimedValue = null;
  }
  
  /* --------------------------------------------------------- APIs */
  static define(store_key, options){
    if ( keys_map[store_key] ) {
      let errMsg = `#fd store key has defined ${store_key}`;
      console.error(errMsg);
      throw errMsg;
    }
    
    let storeInstance = new Store(store_key, options);
    keys_map[store_key] = storeInstance;
    return storeInstance;
  }
  static use(store_key){
    let store = keys_map[store_key];
    if ( !store ) {
      let errMsg = `#fd store key is not define: ${store_key}`;
      console.error(errMsg);
      throw errMsg;
    }
    
    return store;
  }
  
  
  /* --------------------------------------------------------- KITs */
  _getSessionStorage(){ }
  _setSessionStorage(){ }
  _clearSessionStorage(){ }
  _setLocalStorage(){ }
  _getLocalStorage(){ }
  _clearLocalStorage(){ }
  /* --------------------------------------------------------- APIs */
  get = ()=>{
    if (this._trimedValue!==null) { return this._trimedValue; }
    
    this._trimedValue = this.trim( this.value );
    return this._trimedValue; 
  }
  set = (val)=>{
    let preV = this.get();
    this.value = val; 
    this._trimedValue = null; 
    this._listenCallbacks.forEach((listenRun,idx)=>{
      listenRun(val, preV);
    })
  }
  clear = ()=>{ this.set(); }
  _listenCallbacks = [];
  listen = (listenRun)=>{
    this._listenCallbacks.push( listenRun )
  }
}


/* ** -------------------------------------------------------
  const st = Store.define('key_001', { });

  const store = Store.use('key_001');
  store.get();
  store.set();
  store.clear();
  store.listen((val, pre)=>{ }); 
*/








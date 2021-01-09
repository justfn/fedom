
import { render, } from "../index.js";

export default class Router {
  constructor(routeOptions = {}){ 
    const {
      routes = [],
    } = routeOptions;
    this._route_map = {};
    routes.forEach((itm,idx)=>{
      this._route_map[itm.path] = itm.component; 
    })
    console.log( this._route_map );
    
    // todo 
    this._root = document.querySelector("#app");
    
    window.addEventListener("hashchange", this._hashchangeListener)
  }
  
  
  
  
  _hashchangeListener = (evt)=>{
    // console.log(location.hash);
    // console.log(evt);
    // evt.oldURL: "http://0.0.0.0:9000/#/home"
    // evt.newURL: "http://0.0.0.0:9000/#/tic_tac_toe"
    let pathObj = this._getHashPathObj(evt.newURL);
    let cptPms = this._route_map[pathObj.path];
    cptPms().then((module)=>{
      let Cpt = module.default;
      this._root.innerHTML = '';
      render( <Cpt />, this._root )
    })
  }
  _getHashPathObj = (fullUrl)=>{
    let result = {
      path: '',
      query: {},
      hash: '',
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
      if (hash) {
        result.hash = hash;
      }
    }
    
    return result;
  }
  
}




















import "./home.less";
import PageA from "../../Parts/PageA/PageA.js";
import Header from "../../Parts/Header/Header.js";
import CptA from "../apps/TicTacToe/CptA.js";
import FloatCatalog from "../../Parts/FloatCatalog/FloatCatalog.js";

const {
  VaryValue, 
} = window.$fd

let Header_ = VaryValue(Header);
let isActive = VaryValue(true);
let varyText = VaryValue('fd 001');
let val2 = VaryValue(0);
let elDom = document.createElement("div")
elDom.textContent = 'testaaa';
let headerTitle = VaryValue(0);
setTimeout(function(){
  headerTitle.set(function(val){
    return ++val;
  })
},1000)

// console.log('# page_home');

export default function(props, context){
  let varyShowPart1 = VaryValue('block');
  let style = {
    'color': 'red',
    'font-size': '20px',
  }
  let fn1 = (evt)=>{
    console.log('# 01', evt);
  }
  let fn2 = function(evt){
    evt.stopPropagation();
    isActive.set((v)=>{
      return !v;
      
      if (v=='active') {
        return 'disabled';
      }

      return 'active';
    })
  }
  
  let varyInputVal = VaryValue('init val');
  let inputHandel = (evt)=>{
    let val = evt.target.value
    varyInputVal.value = val; 
  }
  
  let htmlDom = context.html(`
    <div>htmlDom 111 </div>
    <h1>htmlDom 222</h1>
    <li>htmlDom 333</li>
  `)
  
  let val = Header_.value;
  console.log( val, '=== ');
  let changeClickHandle = ()=>{
    varyInputVal.value = Date.now();
    
    // varyShowPart1.value = 'block'
    if (Header_.value===null) {
      Header_.value = val;
    }
    else {
      Header_.value = null;
    }
  }
  return (
    <PageA class={[ 'fe', isActive, 'dom',  ]} 
      style={style} 
      onClick={fn1}
      >
      <button onClick={changeClickHandle}>AAAAAAAAAAAAAAAAAAA</button>
      <div style={{display:varyShowPart1,}} onClick={()=>{varyShowPart1.value='none';}}>
        <hr />
        { /* jsx能力 */ }
        
        
      </div>
      
      
      <hr />
      { /* Feature: 动态化-标签、组件 
        */ }
      <Header_ class="bbbb"  />
      
      <hr />
      { /* Feature: 动态化-子节点-文本、数值 */ }
      <button onClick={fn2}>{ varyText }</button>
      <i> { val2 } </i>
      
      <hr />
      { /* Feature: 嵌入原生DOM节点元素 */ }
      <td> { elDom } </td>

      <hr />
      { /* Feature: API-富文本渲染能力 */ }
      { htmlDom }
      
      
      <hr />
      
      <input value={varyInputVal} />
      { varyInputVal }
      
      <hr />
      <hr />
      <hr />
    </PageA>
  );
}




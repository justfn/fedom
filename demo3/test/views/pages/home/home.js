import { useVary, } from "../../../../libs/index.js";

import Header from "../../Parts/Header/Header.js";
import CptA from "../tic_tac_toe/CptA.js";
import "./home.less";

let VaryTag = useVary(Header);
let isActive = useVary(true);
let varyText = useVary('fd 001');
let val2 = useVary(0);
let elDom = document.createElement("div")
elDom.textContent = 'testaaa';
let list = ['a','b','c'].map((itm,idx)=>{
  return <span>{itm}</span>
})


export default function(props, context){
  let varyShowPart1 = useVary('block');
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
  
  let varyInputVal = useVary('init val');
  let inputHandel = (evt)=>{
    let val = evt.target.value
    varyInputVal.value = val; 
  }
  
  let htmlDom = context.html(`
    <div>htmlDom 111 </div>
    <h1>htmlDom 222</h1>
    <li>htmlDom 333</li>
  `)
  
  let changeClickHandle = ()=>{
    varyInputVal.value = Date.now();
    
    // varyShowPart1.value = 'block'
  }
  return (
    <section class={[ 'fe', isActive, 'dom',  ]} 
      style={style} 
      onClick={fn1}
      >
      <button onClick={changeClickHandle}>AAAAAAAAAAAAAAAAAAA</button>
      <div style={{display:varyShowPart1,}} onClick={()=>{varyShowPart1.value='none';}}>
        <hr />
        { /* jsx能力 */ }
        hello fedom
        <ol>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ol>
        { '@@@@@@@@@@@@@' }
        <Header class="aaa" keya={varyText} > 
          <div><CptA name="111"/></div>
          <div><CptA name="222"/></div>
        </Header>
        { list } 
      </div>
      
      
      <hr />
      { /* Feature: 动态化-标签、组件 */ }
      <VaryTag class="bbbb" />
      
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
    </section>
  );
}




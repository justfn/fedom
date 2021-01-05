import { useVary, } from "../../../../libs/index.js";

import Header from "../../Parts/Header/Header.js";
import CptA from "../tic_tac_toe/CptA.js";
import "./home.less";

let isActive = useVary(true);
let val1 = useVary('fd 001');
let val2 = useVary(0);
let Hd = useVary(Header);
let elDom = document.createElement("div")
elDom.textContent = 'testaaa';
let list = ['a','b','c'].map((itm,idx)=>{
  return <span>{itm}</span>
})


export default function(props, context){
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
  
  let htmlDom = context.html(`
    <div>htmlDom 111 </div>
    <h1>htmlDom 222</h1>
    <li>htmlDom 333</li>
  `)
  
  return (
    <section class={[ 'fe', isActive, 'dom',  ]} style={style} onClick={fn1}>
      <button onClick={fn2}>{ val1 }</button>
      <hr />
      
      { /* */ }
      
      hello fedom

      <hr />
      { val2 }
      <hr />

      <div id="aa">1{ val2 } 2 </div>
      <hr />
      
      <ol>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ol>
      
      <hr />
      <Header class="aaa" keya={val1} > 
        <div><CptA name="111"/></div>
        <div><CptA name="222"/></div>
        { '@@@@@@@@@@@@@' }
      </Header>
      

      <hr />
      <Hd class="bbbb" />
      
      
      <hr />
      { elDom }
      
      <hr />
      123123
      
      <hr />
      { list } 
      
      <hr />
      { htmlDom }
    </section>
  );
}




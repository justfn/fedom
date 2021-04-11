
import "./home.less";
import PageA from "../../Parts/PageA/PageA.js";
import Header from "../../Parts/Header/Header.js";
import FloatCatalog from "../../Parts/FloatCatalog/FloatCatalog.js";
import PartA from "../../parts/PartA/PartA.js";

const {
  VaryValue, 
} = window.$fd

let elDom = document.createElement("div")
elDom.textContent = ' =================================== ';

export default function(props, context){
  setTimeout(()=>{
    console.log( 'home mounted ' );
  })
  context.onUnmount(()=>{
    console.log( 'home onUnmount' );
  })
  
  let $Header_ = VaryValue(null);
  // let $Header_ = VaryValue(Header);
  let isActive = VaryValue(true);
  let varyText = VaryValue('fd 001');
  let val2 = VaryValue(0);
  // let headerTitle = VaryValue(0);
  // setTimeout(function(){
  //   headerTitle.set(function(val){
  //     return ++val;
  //   })
  // },1000)
  
  // console.log('# page_home');
      
      
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
  
  let varyInputVal = VaryValue('initval');
  let inputHandel = (evt)=>{
    let val = evt.target.value
    varyInputVal.value = val; 
  }
  
  let htmlDom = context.html(`
    <div>htmlDom 111 </div>
    <h1>htmlDom 222</h1>
    <li>htmlDom 333</li>
  `)
  
  let val = $Header_.value;
  // console.log( val, '=== ');
  let changeClickHandle = ()=>{
    varyInputVal.value = Date.now();
    
    // varyShowPart1.value = 'block'
    if ($Header_.value===null) {
      $Header_.value = Header;
    }
    else if ( $Header_.value === Header ) {
      $Header_.value = PartA;
    }
    else {
      $Header_.value = null;
    }
  }
  return (
    <PageA class={[ 'fe', isActive, 'dom', console.log(111) ]} 
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
      <$Header_ isShowVary="123" class="bbbb"  />
      
      <hr />
      { /* Feature: 动态化-子节点-文本、数值 */ }
      <button onClick={fn2}>{ varyText }</button>
      <i> { val2 } </i>
      
      <hr />
      { /* Feature: 嵌入原生DOM节点元素 */ }
      <h1>
        { elDom }
      </h1>

      <hr />
      { /* Feature: API-富文本渲染能力 */ }
      { htmlDom }
      
      
      <hr />
      
      <input value={varyInputVal} />
      { varyInputVal }
      <hr />
      { varyInputVal }
      
      {
        [1,2,3].map((itm,idx)=>{
          return <h1>{itm}</h1>
        })
      }
      
      <hr />
      <hr />
      <hr class={console.log(222)} />
    </PageA>
  );
}




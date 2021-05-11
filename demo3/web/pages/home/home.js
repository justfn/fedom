
import "./home.less";
import PageA from "../../Parts/PageA/PageA.js";
import Header from "../../Parts/Header/Header.js";
import FloatCatalog from "../../Parts/FloatCatalog/FloatCatalog.js";
import PartA from "../../parts/PartA/PartA.js";

const {
  VaryValue, 
  VaryKeys,
  RefValue,
} = window.$fd

let elDom = document.createElement("div")
elDom.textContent = ' =================================== ';

export default function(props, context){
  setTimeout(()=>{
    console.log( 'home mounted ' );
  })
  context.onUnmount(()=>{
    console.log( 'home onUnmount' );
    // alert(' onUnmount  ');
    sessionStorage.aaa = Date.now(); 
  })
  
  // context.plan('plnA').then(()=>{
  // })
  
  let ref1 = RefValue();
  let ref2 = RefValue();
  let ref3 = RefValue();
  
  ref1.then((ctx)=>{
    console.log(ctx, 'ref1');
  })
  ref1.then((ctx)=>{
    console.log(ctx, 'ref1');
  })
  ref2.then((ctx)=>{
    console.log(ctx, 'ref2');
  })
  ref3.then((ctx)=>{
    console.log(ctx, 'ref3');
    ctx.methods.alert();
  })
  
  
  
  // let Header$ = VaryValue(Header);
  let Header$ = VaryValue(null);
  // let Header$ = VaryValue(Header);
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
  
  let varyKeys$ = VaryKeys({
    a: 111,
    b: 222,
    c: 333,
  })
      
      
  let varyShowPart1 = VaryValue(true);
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
    varyInputVal.$$ = val; 
  }
  
  let htmlDom = context.html(`
    <div>htmlDom 111 </div>
    <h1>htmlDom 222</h1>
    <li>htmlDom 333</li>
  `)
  
  let val = Header$.$$;
  // console.log( val, '=== ');
  let changeClickHandle = ()=>{
    console.log( ' 1');
    varyInputVal.$$ = Date.now();
    
    if (Header$.$$===null) {
      Header$.$$ = Header;
    }
    else if ( Header$.$$ === Header ) {
      Header$.$$ = PartA;
    }
    else {
      Header$.$$ = null;
    }
  }
  let isShow$ = VaryValue(false);
  let changeClickHandle1 = ()=>{
    console.log( isShow$.$$ );
    isShow$.$$ = !isShow$.$$;
  }
  return (
    <PageA ref={ref1} class={[ 'fe', isActive, 'dom', console.log(111) ]} 
      style={style} 
      onClick={fn1}
      >
      
      <button onClick={changeClickHandle}> 切换元素 </button>
      <button onClick={changeClickHandle1}> 是否显示1 </button>
      <button onClick={()=>{ varyShowPart1.$$=!varyShowPart1.$$ }} > 是否显示2 </button>
      <div varyShow={false}>
        jsx能力
        <hr />
        { /* jsx能力 */ }
        
      </div>
      
      <div varyShow={isShow$} ref={ref2}>
        { varyKeys$.a }
        { varyKeys$.b }
        { varyKeys$.c }
      </div>
      
      
      <hr />
      { /* Feature: 动态化-标签、组件 
        */ }
      <Header$  isShowVary="123" class="bbbb" ref={ref3}  name="header-component" >
        123
      </Header$>
      
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




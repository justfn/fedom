
import "./home.less";
import LayoutA from "../../../parts/LayoutA/LayoutA.js";
import Header from "../../../parts/Header/Header.js";
import PartA from "../../../parts/PartA/PartA.js";

const {
  VaryValue, 
  VaryMap,
  AsyncValue,
  Store,
  utils,
} = window.$fd

let elDom = document.createElement("div")
elDom.textContent = ' =================================== ';

export default function TestHome(props, context){
  // console.log(" >>>>>>>>>>>>>> ", Store.use(1) )
  context.$mounted.then(()=>{
    console.log(' ==== ');
  })
  
  
  setTimeout(()=>{
    console.log( 'test home mounted 11 ' );
  })
  context.onUnmount = ()=>{
    console.log( 'test home onUnmount 111' );
    // alert(' onUnmount  ');
    sessionStorage.aaa = Date.now(); 
  }
  
  // context.plan('plnA').then(()=>{
  // })
  
  let ref1 = AsyncValue();
  let ref2 = AsyncValue();
  let ref3 = AsyncValue();
  
  ref1.then((ctx)=>{
    console.log(ctx, 'ref1');
  })
  ref1.then((ctx)=>{
    console.log(ctx, 'ref1');
  })
  ref2.then((ctx)=>{
    console.log(ctx, 'ref2');
    console.log(ctx.childNodes.length, 'ref2');
  })
  ref3.then((ctx)=>{
    console.log(ctx, 'ref3');
    ctx.methods.alert();
  })
  
  
  
  // let Header$ = VaryValue(Header);
  let Header$ = VaryValue(Header);
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
  
  let varyKeys$ = VaryMap({
    a: 111,
    b: 222,
    c: 333,
  })
      
      
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
  
  let htmlDom = utils.html(`
    <div>htmlDom 111 </div>
    <h1>htmlDom 222</h1>
    <li>htmlDom 333</li>
  `)
  
  let val = Header$.$$;
  // console.log( val, '=== ');
  let changeClickHandle = ()=>{
    varyInputVal.$$ = Date.now();
    // debugger

    if (Header$.$$===PartA) {
      Header$.set(()=>{
        console.log('bbbb');
        return Header;
      })
    }
    else if ( Header$.$$ === Header ) {
      Header$.set(()=>{
        console.log('ccccc');
        return null;
      });
    }
    else {
      Header$.set(()=>{
        console.log('aaaa');
        return PartA;
      })
    }
  }
  let isShow$ = VaryValue(false);
  let changeClickHandle1 = ()=>{
    console.log( isShow$.$$ );
    isShow$.$$ = !isShow$.$$;
  }
  return (
    <secion>
      <LayoutA ref={ref1} className={[ 'fe', isActive, 'dom', console.log(111) ]} 
        style={style} 
        onClick={fn1}
        >
        
        <button onClick={changeClickHandle}> 切换元素 </button>
        <button onClick={changeClickHandle1}> 是否显示1 </button>
        <div showVary={false}>
          jsx能力
          <hr />
          { /* jsx能力 */ }
          
        </div>
        
        <div showVary={isShow$} ref={ref2}>
          { varyKeys$.a }
          { varyKeys$.b }
          { varyKeys$.c }
        </div>
        
        
        <hr />
        { /* Feature: 动态化-标签、组件 
          */ }
        <Header$  isShowVary="123" className="bbbb" ref={ref3}  name="header-component" >
          vary tag content 
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
        <hr className={console.log(222)} />
      </LayoutA>
    </secion>
  );
}















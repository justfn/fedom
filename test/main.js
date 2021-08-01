// 引入依赖 
import "fedom";
// 全局样式 
import "./src/assets/styles/global.less";
// 路由控制 
// import router from "./src/router/router.js";

const {
  render, 
  VaryValue, 
} = window.$fd;
// 
// let varyText$ = VaryValue('*****');
// let VaryTag01$ = VaryValue(null);
// let VaryTag02$ = VaryValue('li');
// function Tag(){
//   return (
//     <section>
//       <h1>aaa</h1>
//       { '11111' }
//       <hr />
//       000 
//       { varyText$ }
//       <VaryTag02$ > li </VaryTag02$>
//       <VaryTag01$ > null </VaryTag01$>
//     </section>
//   );
// } 
// let VaryTag03$ = VaryValue( Tag );



let dom1$ = VaryValue('aaa');
let result1 = render(
  dom1$, 
  document.getElementById("app")
);
console.log( result1 );   
let dom2$ = VaryValue(document.createElement("input"));
let result2 = render(
  dom2$, 
  document.getElementById("app")
);
console.log( result2 );   
let dom3$ = VaryValue( <div>123</div> );
let result3 = render(
  dom3$, 
  document.getElementById("app")
);
console.log( result3 );   
let dom4$ = VaryValue( [
  'aaa',
  <a>bbb</a>,
  VaryValue('ccc')
] );
let result4 = render(
  dom4$, 
  document.getElementById("app")
);
console.log( result4 );   



// render(
//   <VaryTag03$ /> 
// 
//   // <div>
//   //   <hr />
//   //   { '11111' }
//   //   <hr />
//   //   { varyText$ }
//   //   <hr />
//   //   { '22222' }
//   //   <hr />
//   //   <h1>aaa</h1>
//   //   <hr className={console.log(222)} />
//   // </div>
//   , 
//   document.querySelector("#app")
// );







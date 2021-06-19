// 引入依赖 
import "../fd_lib/index.js";
// 全局样式 
import "./assets/styles/global.less";
// 路由控制 
import router from "./router/router.js";

const {
  render, 
  VaryValue, 
} = window.$fd;

// let varyText$ = VaryValue('*****');
// let VaryTag$ = VaryValue('li');
// let VaryTag01$ = VaryValue(null);
// function Tag(){
//   return (
//     <section>
//       000 
//       { '11111' }
//       <hr />
//       { varyText$ }
//       <hr />
//       <VaryTag$ > xxx </VaryTag$>
//       <VaryTag01$ > xxx </VaryTag01$>
//       <hr />
//       <h1>aaa</h1>
//     </section>
//   );
// } 

// render(
//   <Tag /> 
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
// 
//   , 
//   document.querySelector("#app")
// );







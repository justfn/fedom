// 引入依赖 
import "../fd_lib/index.js";
// 全局样式 
import "./assets/styles/global.less";
// 路由控制 
// import router from "./router/router.js";

const {
  render, 
  VaryValue, 
} = window.$fd;

let varyText$ = VaryValue('*****');
let VaryTag01$ = VaryValue(null);
let VaryTag02$ = VaryValue('li');
function Tag(){
  return (
    <section>
      <h1>aaa</h1>
      { '11111' }
      <hr />
      000 
      { varyText$ }
      <VaryTag02$ > li </VaryTag02$>
      <VaryTag01$ > null </VaryTag01$>
    </section>
  );
} 
let VaryTag03$ = VaryValue( Tag );

render(
  <VaryTag03$ /> 

  // <div>
  //   <hr />
  //   { '11111' }
  //   <hr />
  //   { varyText$ }
  //   <hr />
  //   { '22222' }
  //   <hr />
  //   <h1>aaa</h1>
  //   <hr className={console.log(222)} />
  // </div>
  , 
  document.querySelector("#app")
);









import router from "./router/router.js";







import { render, } from "../libs/index.js";


import Home from "./views/pages/home/home.js";
const root = document.querySelector("#app");
// console.log( '# root', root  );
render( <Home />, root );




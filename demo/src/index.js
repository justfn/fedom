

import router from "./router/router.js";

console.log('# 001',);

 router['/home'].page().then((data)=>{
   console.log(data);
 })
 .catch((err)=>{
   console.log(err);
 })


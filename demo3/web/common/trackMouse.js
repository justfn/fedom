
const {
  VaryValue, 
} = window.$fd;


export default function(elem){
  let x = VaryValue(0);
  let y = VaryValue(0);
  
  elem.addEventListener("mousemove",function(evt){
    // console.log(evt);
    x.value = evt.clientX; 
    y.value = evt.clientY; 
  })
  
  return {
    x,
    y,
  };
}
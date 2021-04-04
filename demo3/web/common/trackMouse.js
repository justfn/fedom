
const {
  VaryValue, 
} = window.$fd;


export default function(elem){
  let x = VaryValue(0);
  let y = VaryValue(0);
  
  elem.addEventListener("mousemove",function(evt){
    x.value = Math.round( evt.clientX/elem.clientWidth * 100 ); 
    y.value = Math.round( evt.clientY/elem.clientHeight * 100 ); 
  })
  
  return {
    x,
    y,
  };
}
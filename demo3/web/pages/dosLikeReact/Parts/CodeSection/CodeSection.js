import xx from "./CodeSection.less";

const {
  VaryValue, 
  VaryKeys, 
  RefValue, 
} = window.$fd;

export default function (props, context){
  
  
  
  return (
    <section class="part-">
      { props.children }
    </section>
  );
} 

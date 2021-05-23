import xx from "./CodeSection.less";

const {
  VaryValue, 
  VaryKeys, 
} = window.$fd;

export default function (props, context){
  
  
  
  return (
    <section className="part-">
      { props.children }
    </section>
  );
} 

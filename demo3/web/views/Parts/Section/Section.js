import { VaryValue, } from "../../../../fd_lib/index.js";

import "./Section.less";

export default function Section(props, context){
  return (
    <section class={['part_Section', props.class??'']}>
      <h1 class="ps_header">
        <div class="ps_lft"> {props.title} </div>
        <div class="ps_rit"> ▼ </div>
      </h1>
      <div class="ps_wrap">
        { props.children }
      </div>
    </section>
  );
}



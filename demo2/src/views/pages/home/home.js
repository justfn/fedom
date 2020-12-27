
import { useVary, } from "../../../../libs/vary/Vary.js";

import Header from "../../Parts/Header/Header.js";

let isActive = useVary(true);
let val1 = useVary('fd 001');
let val2 = useVary(0);

export default function(query){
  
  return {
    tag: 'div',
    class: [ 'fe', 'dom', isActive, ],
    style: {
      'color': 'red',
      'font-size': '20px',
    },
    click(evt,a){
      console.log('# 01', evt);
    },
    children: [
      'hello fedom',
      val2,
      {
        children: [
          val2,
        ],
      },
      Header,
      {
        tag: 'button',
        click(evt){
          evt.stopPropagation();
          // val2.set((v)=>{
            //   return v+1;
            // })
            isActive.set((v)=>{
              return !v;
              if (v=='active') {
                return 'disabled';
              }
              
              return 'active';
            })
          },
        children: [
          val1,
        ],
      }
    ],
  }
}



import "./chooseList.less";
import LayoutA from "../../../parts/LayoutA/LayoutA.js";

const {
  VaryValue, 
} = window.$fd;


export default function chooseList(props, context){
  let list = [
    {
      label: 'aaa',
      value: '111',
      choosed: true, 
      idx: 0, 
    },
    {
      label: 'bbb',
      value: '222',
      choosed: false, 
      idx: 1, 
    },
    {
      label: 'ccc',
      value: '333',
      choosed: false, 
      idx: 2, 
    },
    {
      label: 'ddd',
      value: '444',
      choosed: false, 
      idx: 3, 
    },
  ]
  let events = {
    onClick1(evt, idx){
      list2$.forEach((itm,idx)=>{
        itm.set((val)=>{
          let rst = {
            ...val,
            choosed: false,
          };
          return rst;
        })
      })
      list2$[idx].set((val)=>{
        let rst = {
          ...val,
          choosed: true,
        };
        return rst;
      })
      
      console.log( idx, list2$);
    },
  }
  let list1$ = VaryValue(list, (list)=>{
    return list.map((itm,idx)=>{
      return (
        <button 
          data-choosed={itm.choosed} 
          onClick={ (evt)=>events.onClick1(evt, itm, list$) }
          >
          { itm.label } { itm.value}
        </button>
      )
    });
  });
  let list2$ = list.map((itm,idx)=>{
    return VaryValue(itm, (v)=>{
      return (
        <button 
          data-choosed={v.choosed} 
          onClick={ (evt)=>events.onClick1(evt, idx) }
          >
          { v.label } { v.value}
        </button>
      );
    })
  })
  
  
  
  
  return (
    <LayoutA className={"chooseList"}>
    
      <div>1</div>
      { list2$ }
      <div>2</div>
    
      
    </LayoutA>
  );
} 



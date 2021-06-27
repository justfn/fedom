import "./chooseList.less";
import LayoutA from "../../../parts/LayoutA/LayoutA.js";

const {
  VaryValue, 
  VaryList, 
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
  
  const list1 = {
    list$: VaryValue(list, (list)=>{
      return list.map((itm,idx)=>{
        return (
          <button 
            data-choosed={itm.choosed} 
            onClick={ (evt)=>list1.onClick(evt, itm) }
            >
            { itm.label } { itm.value}
          </button>
        )
      });
    }),
    onClick(evt, itm){
      console.log( evt, itm);
    },
  }
  const list2 = {
    list$: list.map((itm,idx)=>{
      return VaryValue(itm, (v)=>{
        return (
          <button 
            data-choosed={v.choosed} 
            onClick={ (evt)=>list2.onClick(evt, idx) }
            >
            { v.label } - { v.value}
          </button>
        );
      })
    }),
    onClick(evt, idx){
      console.log( idx, list2.list$);
      list2.list$.forEach((itm,idx)=>{
        itm.set((val)=>{
          let rst = {
            ...val,
            choosed: false,
          };
          return rst;
        })
      })
      list2.list$[idx].set((val)=>{
        let rst = {
          ...val,
          choosed: true,
        };
        return rst;
      })
    },
  };
  const list3 = {
    list: [
      {
        label: 'aaa',
        value: '111',
        choosed: VaryValue(true), 
        idx: 0, 
      },
      {
        label: 'bbb',
        value: '222',
        choosed: VaryValue(false), 
        idx: 1, 
      },
      {
        label: 'ccc',
        value: '333',
        choosed: VaryValue(false), 
        idx: 2, 
      },
      {
        label: 'ddd',
        value: '444',
        choosed: VaryValue(false), 
        idx: 3, 
      },
    ],
    get list$(){
      return VaryList(list3.list, (val, idx, id, list)=>{
        return (
          <button 
            data-choosed={val.choosed}
            onClick={ (evt)=>list3.onClick(val, idx, id) }
            >
            { val.label } - { val.value}
          </button>
        );
      })
    },
    onClick(val, idx, id){
      list = list3.list;
      let preIdx = list.findIndex(itm=>{ return !!itm.choosed.get() });
      console.log( preIdx, idx );
      list[preIdx].choosed.set((v)=>{ return !v; })
      .then(()=>{
        return list[idx].choosed.set((v)=>{ return !v; })
      })
    
    
      // this.list$.$update(preIdx, {
      //   ...list[preIdx], 
      //   choosed: false,
      // })
      // .then(()=>{
      //   this.list$.$update(idx, {
      //     ...val, 
      //     choosed: !val.choosed,
      //   });
      // })
    },
  }
  
  
  
  
  return (
    <LayoutA className={"chooseList"}>
    
      <div>1</div>
      { list1.list$ }
      
      <div>2</div>
      { list2.list$ }
      
      <div>3</div>
      { list3.list$ }
      
    </LayoutA>
  );
} 



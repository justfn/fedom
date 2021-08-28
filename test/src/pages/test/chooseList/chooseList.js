import "./chooseList.less";
import LayoutA from "../../../parts/LayoutA/LayoutA.js";

const {
  VaryValue, 
  VaryList, 
} = window.$fd;


export default class ChooseList {
  constructor(props){ 
  }

  render(props){
    const list1 = {
      list: [
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
      ],
      get list$(){
        return this.list.map((itm,idx)=>{
          return VaryValue(itm, (v)=>{
            return (
              <button 
                data-choosed={v.choosed} 
                onClick={ (evt)=>this.onClick(idx) }
                >
                { v.label } - { v.value}
              </button>
            );
          })
        });
      },
      onClick(idx){
        console.log( this, idx );
        this.list$.forEach((itm,idx)=>{
          itm.set((val)=>{
            setTimeout(()=>{
              
              console.log( val );
            },1000)
            let rst = {
              ...val,
              choosed: false,
            };
            return rst;
          })
        })
        // this.list$[idx].set((val)=>{
        //   let rst = {
        //     ...val,
        //     choosed: true,
        //   };
        //   return rst;
        // })
      },
    };
    const list2 = {
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
        return VaryList(this.list, (val, idx, id, list)=>{
          return (
            <button 
              data-choosed={val.choosed}
              onClick={ (evt)=>this.onClick(val, idx, id) }
              >
              { val.label } - { val.value}
            </button>
          );
        })
      },
      onClick(val, idx, id){
        let list = this.list;
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
        
      </LayoutA>
    );
  } 

}


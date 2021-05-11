
import "./todoList.less";

const {
  VaryValue,
  VaryKeys,
} = window.$fd;

export default function TodoList(props, context){
  
  const inputVal$ = VaryValue('');
  const todoList$ = VaryValue([], (list)=>{
    return list;
    return list.map((itm,idx)=>{
      return <div> { itm }</div>
    });
    return <div>{ list }</div>;
  });
  const list1 = [
    // 1,
    // 2,
    4, 
  ]
  
  const evts = {
    click: (evt)=>{
      console.log(evt);
      todoList$.set((v)=>{
        return [
          ...v,
          inputVal$.$$,
        ];
      })
      .then(()=>{
        console.log( todoList$ );
      })
    },
  }
  
  return (
    <div class="TodoList">
      <div class="part1">
        <input value={inputVal$} placeholder="请输入代办事项" class="input" />
        <button onClick={evts.click}>添加</button>
      </div>
      
      <div class="part2">
        { todoList$ }
      </div>
      
      <div> 
      </div>
      { list1 } 
      
    </div>
  );
} 


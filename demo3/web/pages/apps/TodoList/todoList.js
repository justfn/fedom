
import "./todoList.less";

const {
  VaryValue,
  VaryKeys,
  VaryList, 
} = window.$fd;

export default function TodoList(props, context){
  
  const inputVal$ = VaryValue('');
  const todoList$ = VaryList(
    [
      {
        text: '初始值001', 
        isDone: false,
      },
      {
        text: '初始值002', 
        isDone: false,
      },
      {
        text: '初始值003', 
        isDone: false,
      },
      {
        text: '初始值004', 
        isDone: false,
      },
      {
        text: '初始值005', 
        isDone: false,
      },
    ], 
    (id, itm, idx, list)=>{
      return <div onClick={()=>evts.removeTodo( id, itm.text )}>{ itm.text }</div> ;
    }
  );
  const list1 = [
    // 1,
    // 2,
    4, 
  ]
  
  const evts = {
    click: (evt)=>{
      console.log(evt);
      let newTodo = inputVal$.$$;
      todoList$.insert(( list )=>{
        return [
          list.length, 
          [ 
            {
              text: newTodo,
              isDone: false, 
            },
          ]
        ];
      })
      .then(()=>{
        inputVal$.set(()=>{
          return '';
        })
        console.log( todoList$ );
      })
    },
    removeTodo: ( id, text )=>{
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> removeTodo id: ", id)
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> removeTodo text: ", text)
      todoList$.remove( id )
      .then(()=>{
        // 
      })
    }
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


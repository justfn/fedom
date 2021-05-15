
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
    (itm, idx, id, list)=>{
      return (
        <div class="itm-wrap">
          <span onClick={()=>evts.updateTodoItm( id, itm )}> {itm.isDone} </span>
          <div >
            { itm.text }
          </div>
          <span onClick={()=>evts.removeTodoItm( id, itm.text )}>删除</span>
        </div>
      );
    }
  );
  const list1 = [
    // 1,
    // 2,
    4, 
  ]
  
  const evts = {
    addTodoItm: (evt)=>{
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
    removeTodoItm: (id, text )=>{
      todoList$.remove( id )
      .then(()=>{
        // 
      })
    },
    updateTodoItm: (id, itm)=>{
      todoList$.update(id, {
        ...itm, 
        isDone: !itm.isDone,
      })
    },
  }
  
  return (
    <div class="TodoList">
      <div class="part1">
        <input value={inputVal$} placeholder="请输入代办事项" class="input" />
        <button onClick={evts.addTodoItm}>添加</button>
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


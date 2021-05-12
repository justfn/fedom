
import "./todoList.less";

const {
  VaryValue,
  VaryKeys,
  VaryList, 
} = window.$fd;

export default function TodoList(props, context){
  
  const inputVal$ = VaryValue('');
  const todoList$ = VaryList([1]);
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
            <div onClick={()=>evts.removeTodo( list.length )}>{ newTodo }</div> 
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
    removeTodo: ( id )=>{
      todoList$.remove( id )
      .then(()=>{
        console.log( 'remove id: ', id);
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


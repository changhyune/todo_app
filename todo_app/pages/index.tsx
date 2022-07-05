import type { NextPage } from 'next'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import cx from 'classnames'

const Home: NextPage = () => {

  const [todoItem, setTodoItem] = useState("");

  const [items, setItems] = useState([
    {
      id: "1234",
      message: "do somthing",
      done: false,
    },
  ]);

  const handleAdd = () =>{
    if (todoItem){
      setItems([
        {
          id: uuidv4(),
          message: todoItem,
          done: false,
        }, 
        ...items
      ]);
      setTodoItem("");
    }
  };

  const handledel = () =>{

  };

  const handleToggle = (id:string) =>{
    const _items = items.map((item)=>{
      if(item.id === id){
        return{
          ...item,
          done: !item.done,
        };
      }
      return item;
    });

    setItems(_items);
  };


  return (
    <div>
      <h1>TODO APP</h1>

      <div>
        <input type="text" value={todoItem} onChange={(e)=> setTodoItem(e.target.value)}></input>
        <button type="button" onClick={handleAdd}>add</button>&emsp; 
        <button type="button" onClick={handledel}>del</button>
      </div>

      <ul>
        {items.map(({id,message,done}) =>(
          <li key={id} onClick = {()=>handleToggle(id)} className ={cx("item", {done})}>
            {message} - {id}
            </li>
        ))}
        <li>{todoItem}</li>
      </ul>
    </div>
  )
}

export default Home

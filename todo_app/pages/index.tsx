import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {

  const [todoItem, setTodoItem] = useState("");

  const [items, setItems] = useState([
    "asdasd",
    "asdasdassd",
    "asdasdasdassd"
  ]);

  const handleAdd = () =>{
    if (todoItem){
      setItems([todoItem, ...items]);
      setTodoItem("");
    }
  };



  return (
    <div>
      <h1>TODO APP</h1>

      <div>
        <input type="text" value={todoItem} onChange={(e)=> setTodoItem(e.target.value)}></input>
        <button type="button" onClick={handleAdd}>add</button>
      </div>

      <ul>
        <li>list1</li>
        <li><s>list2</s></li>
        {items.map((item) =>(
          <li key={item}>{item}</li>
        ))}
        <li>{todoItem}</li>
      </ul>
    </div>
  )
}

export default Home

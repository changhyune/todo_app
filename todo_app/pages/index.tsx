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
        {items.filter(({done}) => !done).map(({id,message,done}) =>(
          <li key={id} onClick = {()=>handleToggle(id)} className ={cx("item", {done})}>
            {message} - {id}
            </li>
        ))}

        {items.filter(({done}) => done).map(({id,message,done}) =>(
          <li key={id} onClick = {()=>handleToggle(id)} className ={cx("item", {done})}>
            {message} - {id}
            </li>
        ))}

        <li>{todoItem}</li>
      </ul>

      
      <div className="w-[1440px] h-[1024px] relative overflow-hidden bg-white">
        <p className="w-[436px] h-[164px] absolute left-[502px] top-[92px] text-[64px] text-left text-black">
          TODO APP
        </p>
       
        <input type="text" value={todoItem} onChange={(e)=> setTodoItem(e.target.value)} className="w-[629px] h-[68px] absolute left-[404px] top-[297px] bg-[#d9d9d9]"></input>
        <div className="w-[84px] h-[68px] absolute left-[1066px] top-[297px] bg-[#d9d9d9]" />
        <svg
          width={46}
          height={23}
          viewBox="0 0 46 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-[1086px] top-[332px]"
          preserveAspectRatio="none"
        >
          <path
            d="M45.085 12.0357C45.657 11.4365 45.635 10.487 45.0357 9.91497L35.2704 0.593544C34.6712 0.0215352 33.7217 0.0436164 33.1497 0.642864C32.5777 1.24211 32.5997 2.1916 33.199 2.76361L41.8793 11.0493L33.5935 19.7296C33.0215 20.3288 33.0436 21.2783 33.6429 21.8503C34.2421 22.4223 35.1916 22.4003 35.7636 21.801L45.085 12.0357ZM1.03487 13.4996L44.0349 12.4996L43.9651 9.50041L0.965126 10.5004L1.03487 13.4996Z"
            fill="black"
          />
        </svg>
      </div>;

    </div>
    

  )
}

export default Home

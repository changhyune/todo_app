import type { NextPage } from 'next';
import { useState } from 'react';
import cx from 'classnames';
import {v4 as uuidv4} from "uuid";

import {db} from "../firebase/firebase";
import {
  collection,
  doc,
  query,
  orderBy,
  getDocs,
  addDoc, 
  setDoc,
  deleteDoc,
  serverTimestamp 
} from "firebase/firestore";


const Home: NextPage = () => {


  const [todoItem, setTodoItem] = useState("");

  const [items, setItems] = useState([
    {
      id: "",
      message: "",
      done: false,
    },
  ]);

  // const handleAdd = () =>{
  //     setItems([
  //       {
  //         id:"",
  //         message: todoItem,
  //         done: false,
  //       }, 
  //       ...items
  //     ]);
  //     setTodoItem("");
  // };

  const handledel = () =>{
    
  };

  //파이어베이스에 TODOlist 추가
  const clickadd = ()=>{
    if (todoItem){
      var newid = uuidv4()
      setDoc(doc(db, "TODOLIST", newid), {
        message: todoItem,
        done: false
      });
      console.log(newid)
      setItems([
        {
          id: newid,
          message: todoItem,
          done: false,
        }, 
        ...items,
      ]);
      setTodoItem("");
    }
  }

  const clickdel = (id:string) =>{
    deleteDoc(doc(db, "TODOLIST", id));
  }


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

  const fetchUsers = async () => {
    // ... try, catch 생략
    const usersCollectionRef = collection(db, 'TODOLIST'); // 참조
    const userSnap = await getDocs(usersCollectionRef); // 데이터 스냅 받아오기 - 비동기처리
    const data = userSnap.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    for(var i =0; i < data.length; i++){
      console.log(data[i].id)
      setItems([
        {
          id: data[i].id,
          message: "",
          done: false,
        }, 
        ...items
      ]);
      setTodoItem("");

    }
    console.log(data[0]["message"])
    return data;
  }

  return (
    <div>
      <h1>TODO APP</h1>
      
      <div className="w-[1440px] h-[1024px] relative overflow-hidden bg-white">
        <p className="w-[436px] h-[164px] absolute left-[502px] top-[92px] text-[64px] text-left text-black">
          TODO APP
        </p>
        <input type="text" value={todoItem} onChange={(e)=> setTodoItem(e.target.value)} className="w-[629px] h-[68px] absolute left-[404px] top-[297px] bg-[#d9d9d9]"></input>
        <button type="button" onClick={clickadd} className="w-[84px] h-[68px] absolute left-[1066px] top-[297px] bg-[#d9d9d9]">add</button>
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
        <div className="w-[627px] h-[316px] absolute left-[406px] top-[396px] bg-[#d9d9d9]">
          <ul>
            {items.filter(({done}) => !done).map(({id,message,done}) =>(
              <li key={id} onClick = {()=>handleToggle(id)} className ={cx("item", {done})}>
                {message}
              </li>
            ))}

            {items.filter(({done}) => done).map(({id,message,done}) =>(
              <li key={id} onClick = {()=>clickdel(id)} className ={cx("item", {done})}>
                {message}
              </li>
            ))}

            <li>{todoItem}</li>
          </ul>

        </div>
        <button type="button" onClick={fetchUsers} className="w-[222px] h-[150px] absolute left-[1120px] top-[511px] bg-[#d9d9d9]" />


      </div>;

    </div>
    

  )
}

export default Home

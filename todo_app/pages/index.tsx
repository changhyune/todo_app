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
  updateDoc,
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

  const clickredo = (id:string) =>{
    updateDoc(doc(db, "TODOLIST", id), {
      done: false
     });
    handleToggle(id);
  }

  const clickdel = (id:string) =>{
    deleteDoc(doc(db, "TODOLIST", id));
    const _items = items.filter((item)=>{
      return item.id != id;
    });
    setItems(_items);
  }
  

  const handleToggle = (id:string) =>{
    const _items = items.map((item)=>{
      if(item.id === id){
        if(item.done == false){
          updateDoc(doc(db, "TODOLIST", id), {done: true});
        };
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
    const data = userSnap.docs.map(doc => ({...doc.data(), id: doc.id}));
    setItems(data);
  }
  //fetchUsers()
  return (
    <div>
      <h1>TODO APP</h1>
      
      <div className="w-[1440px] h-[1024px] relative overflow-hidden bg-[#ed9869]">
        <p className="w-[436px] h-[164px] absolute left-[502px] top-[92px] text-[64px] text-center text-black">
          TODO APP
        </p>
        <input type="text" value={todoItem} onChange={(e)=> setTodoItem(e.target.value)} className="w-[629px] h-[68px] absolute left-[404px] top-[297px] rounded-[30px] text-[30px] text-center bg-[#d9d9d9]"></input>
        <button type="button" onClick={clickadd} className="w-[84px] h-[68px] absolute left-[1066px] top-[297px] rounded-[30px] bg-[#d9d9d9]">add</button>
        <p className="w-[203px] h-[42px] absolute left-[618px] top-[374px] text-[32px] text-center text-black">
          Things to do
        </p>
        <div className="w-[627px] h-[316px] absolute left-[406px] top-[423px] bg-[#d9d9d9] rounded-[30px] text-center text-[20px]">
          <ul>
            {items.filter(({done, id}) => !done && id !="").map(({id,message,done}) =>(
              <li key={id} className ={cx("item", {done})}>
                {message} &emsp; <button type="button" onClick = {()=>handleToggle(id)} className="w-80px] h-[40px] bg-[#951D82]">FINISH</button>
              </li>
            ))}
          </ul>

        </div>
        <div className="w-[627px] h-[137px] absolute left-[406px] top-[797px] bg-[#d9d9d9] text-center text-[20px] rounded-[30px]">
          <div>
            {items.filter(({done}) => done).map(({id,message,done}) =>(
              <div>
                <div key={id} className ={cx("item", {done})}>
                  {message} &emsp; <button type="button" onClick = {()=>clickredo(id)} className="w-[40px] h-[40px] bg-[#d9d9d9]">redo</button>
                  &emsp;<button type="button" onClick = {()=>clickdel(id)} className="w-[40px] h-[40px] bg-[#d9d9d9]"><svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 relative"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                      stroke="#111827"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg></button>                   
                </div> 
              </div>
            ))}
          </div>
        </div>
        <p className="w-[255px] h-[39px] absolute left-[593px] top-[749px] text-[32px] text-center text-black">
          Finished!
        </p>
        <button type="button" onClick={()=>fetchUsers()} className="w-[222px] h-[150px] absolute left-[1120px] top-[511px] rounded-[30px] bg-[#d9d9d9]" >불러오기</button>
      </div>;

    </div>
    

  )
}

export default Home

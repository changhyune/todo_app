import type { NextPage } from 'next';
import { useState } from 'react';
import cx from 'classnames';
import {v4 as uuidv4} from "uuid";
import { signOut, useSession } from "next-auth/react";

import {db} from "../firebase/firebase";
import {
  collection,
  doc,
  query,
  orderBy,
  getDocs,
  addDoc, 
  getDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  serverTimestamp 
} from "firebase/firestore";

import dayjs from 'dayjs';
import "dayjs/locale/ko";
dayjs.locale("ko")


const today = dayjs().format("YYYY년 MM월 DD일 dddd")



const Home: NextPage = () => {


  const [todoItem, setTodoItem] = useState("");

  const [items, setItems] = useState([
    {
      id: "",
      message: "",
      done: false,
    },
  ]);

  const { data: session, status } = useSession();

  //파이어베이스에 TODOlist 추가
  const clickadd = ()=>{
    if (todoItem){
      var newid = uuidv4()
      if(status === "authenticated"){
        setDoc(doc(db, "TODOLIST", newid), {
          message: todoItem,
          done: false,
          username: session["user"]["name"]
        });
        console.log(newid)
      }
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
    if(status === "authenticated"){
      updateDoc(doc(db, "TODOLIST", id), {
        done: false
      });
    }
    handleToggle(id);
  }

  const clickdel = (id:string) =>{
    if(status === "authenticated"){deleteDoc(doc(db, "TODOLIST", id));}
    const _items = items.filter((item)=>{
      return item.id != id;
    });
    setItems(_items);
  }
  
  const handleToggle = (id:string) =>{
    const _items = items.map((item)=>{
      if(item.id === id){
        if(item.done == false){
          if(status === "authenticated"){updateDoc(doc(db, "TODOLIST", id), {done: true});}
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
    const usersCollectionRef = collection(db, 'TODOLIST'); 
    const userSnap = await getDocs(usersCollectionRef); 
    const data = userSnap.docs.map(doc => ({...doc.data(), id: doc.id}));
    if(status === "authenticated"){
      const filterdata = data.filter(data => data["username"]== session["user"]["name"])
      setItems(filterdata);
      window.alert("리스트를 불러왔습니다.");
    }
    else{
      window.alert("로그인이 필요한 기능입니다.");
    }
    console.log(session)
  }

  return (
    <div>
      <div>{status === "authenticated" ? (<button type="button" onClick={() => signOut()} className="w-[79px] h-[43px] bg-[#white] text-white" >로그아웃</button>) : (<button type="button" className="w-[79px] h-[43px] bg-[#white] text-white" ><a href='http://localhost:3000/api/auth/signin'>로그인</a></button>)}</div>
      <div>{status === "authenticated" ? (<div className="text-white">{session["user"]["email"]}님 반갑습니다.</div>) : (<div className="text-white"></div>)}</div>
      <div className="w-full h-[1024px] relative overflow-hidden bg-[#EADBBD]">
        <h1 className="w-[436px] h-[164px] absolute left-[502px] top-[30px] text-[64px] text-center text-black">
          TODO APP 
        </h1>
        <div className="absolute left-[1200px]">{today}</div>
        <input type="text" value={todoItem} onChange={(e)=> setTodoItem(e.target.value)} className="w-[629px] h-[68px] absolute left-[404px] top-[140px] rounded-[30px] text-[30px] text-center bg-[#030220] text-white"></input>
        <button type="button" onClick={clickadd} className="w-[84px] h-[68px] absolute left-[1066px] top-[140px] rounded-[17px] text-white bg-[#030220]">할 일 추가</button>
        <button type="button" onClick={()=>fetchUsers()} className="w-[74px] h-[70px] absolute left-[1180px] top-[140px] rounded-[17px] bg-[#030220] text-white" >불러오기</button>
        <p className="w-[203px] h-[42px] absolute left-[270px] top-[220px] text-[32px] text-center text-black">
          해야 할 일
        </p>
        <div className="w-[627px] h-[550px] absolute left-[57px] top-[280px] bg-[#030220] rounded-[30px] text-center text-[27px] text-white">
          <ul>
            {items.filter(({done, id}) => !done && id !="").map(({id,message,done}) =>(
              <li key={id} className ={cx("item", {done})}>
                {message} &emsp; <button type="button" onClick = {()=>handleToggle(id)} className="w-80px] h-[40px] ounded-[17px] bg-[#white]">끝</button>
              </li>
            ))}
          </ul>

        </div>
        <div className="w-[627px] h-[550px] absolute left-[719px] top-[280px] bg-[#030220] text-center text-[27px] rounded-[30px] text-white">
          <div>
            {items.filter(({done}) => done).map(({id,message,done}) =>(
              <div>
                <div key={id} className ={cx("item", {done})}>
                  {message} &emsp; <button type="button" onClick = {()=>clickredo(id)} className="w-[40px] h-[40px] bg-[#030220]"><svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 relative"
                    preserveAspectRatio="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.70719 3.29289C8.09771 3.68342 8.09771 4.31658 7.70719 4.70711L5.41429 7H11.0001C14.8661 7 18.0001 10.134 18.0001 14V16C18.0001 16.5523 17.5524 17 17.0001 17C16.4478 17 16.0001 16.5523 16.0001 16V14C16.0001 11.2386 13.7615 9 11.0001 9H5.41429L7.70719 11.2929C8.09771 11.6834 8.09771 12.3166 7.70719 12.7071C7.31666 13.0976 6.68349 13.0976 6.29297 12.7071L2.29296 8.70711C1.90243 8.31658 1.90243 7.68342 2.29296 7.29289L6.29297 3.29289C6.68349 2.90237 7.31666 2.90237 7.70719 3.29289Z"
                      fill="white"
                    />
                  </svg></button>
                  &emsp;<button type="button" onClick = {()=>clickdel(id)} className="w-[40px] h-[40px] bg-[#030220]"><svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="white"
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
        <p className="w-[255px] h-[39px] absolute left-[915px] top-[220px] text-[32px] text-center text-black">
          다 했다!
        </p>
      </div>;

    </div>
    

  )
}

export default Home

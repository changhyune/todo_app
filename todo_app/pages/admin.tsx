import { NextPage } from "next";
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


const admin: NextPage = () => {

  const { data: session, status } = useSession();

  const loadalluser = async () =>{
    const usersCollectionRef = collection(db, 'LOGINDB'); 
    const userSnap = await getDocs(usersCollectionRef); 
    const data = userSnap.docs.map(doc => ({...doc.data(), id: doc.id}));
    console.log(data[0]["name"])
    // for(var i = 0; i < 8; i++){
    //   if (data.id == null){
    //     data.id = ""
    //   }
    // }
    return data
  }
    
const alluser = loadalluser();



    return(
      <div className="w-[1408px] h-[848px] relative overflow-hidden bg-#EADBBD">
        <div className="w-64 h-[312px] absolute left-[92px] top-[90px] overflow-hidden">
          <div className="w-[165px] h-[31px] absolute left-[45px] top-4 rounded-[20px] bg-[#cae395]" ></div>
          <div className="w-[239px] h-[108px] absolute left-2 top-[198px] rounded-[30px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[69px] rounded-[30px] bg-[#cae395]" />
          <p className="w-[117px] h-5 absolute left-[70px] top-[52px] text-xs text-center text-black">
            Todo
          </p>
          <p className="w-[136px] h-[18px] absolute left-[60px] top-[181px] text-xs text-center text-black">
            Done
          </p>
        </div>
        <div className="w-64 h-[312px] absolute left-[382px] top-[90px] overflow-hidden">
          <div className="w-[165px] h-[31px] absolute left-[45px] top-4 rounded-[20px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[198px] rounded-[30px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[69px] rounded-[30px] bg-[#cae395]" />
          <p className="w-[117px] h-5 absolute left-[70px] top-[52px] text-xs text-center text-black">
            Todo
          </p>
          <p className="w-[136px] h-[18px] absolute left-[60px] top-[181px] text-xs text-center text-black">
            Done
          </p>
        </div>
        <div className="w-64 h-[312px] absolute left-[92px] top-[435px] overflow-hidden">
          <div className="w-[165px] h-[31px] absolute left-[45px] top-4 rounded-[20px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[198px] rounded-[30px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[69px] rounded-[30px] bg-[#cae395]" />
          <p className="w-[117px] h-5 absolute left-[70px] top-[52px] text-xs text-center text-black">
            Todo
          </p>
          <p className="w-[136px] h-[18px] absolute left-[60px] top-[181px] text-xs text-center text-black">
            Done
          </p>
        </div>
        <div className="w-64 h-[312px] absolute left-[382px] top-[435px] overflow-hidden">
          <div className="w-[165px] h-[31px] absolute left-[45px] top-4 rounded-[20px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[198px] rounded-[30px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[69px] rounded-[30px] bg-[#cae395]" />
          <p className="w-[117px] h-5 absolute left-[70px] top-[52px] text-xs text-center text-black">
            Todo
          </p>
          <p className="w-[136px] h-[18px] absolute left-[60px] top-[181px] text-xs text-center text-black">
            Done
          </p>
        </div>
        <div className="w-64 h-[312px] absolute left-[962px] top-[435px] overflow-hidden">
          <div className="w-[165px] h-[31px] absolute left-[45px] top-4 rounded-[20px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[198px] rounded-[30px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[69px] rounded-[30px] bg-[#cae395]" />
          <p className="w-[117px] h-5 absolute left-[70px] top-[52px] text-xs text-center text-black">
            Todo
          </p>
          <p className="w-[136px] h-[18px] absolute left-[60px] top-[181px] text-xs text-center text-black">
            Done
          </p>
        </div>
        <div className="w-64 h-[312px] absolute left-[672px] top-[435px] overflow-hidden">
          <div className="w-[165px] h-[31px] absolute left-[45px] top-4 rounded-[20px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[198px] rounded-[30px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[69px] rounded-[30px] bg-[#cae395]" />
          <p className="w-[117px] h-5 absolute left-[70px] top-[52px] text-xs text-center text-black">
            Todo
          </p>
          <p className="w-[136px] h-[18px] absolute left-[60px] top-[181px] text-xs text-center text-black">
            Done
          </p>
        </div>
        <div className="w-64 h-[312px] absolute left-[672px] top-[90px] overflow-hidden">
          <div className="w-[165px] h-[31px] absolute left-[45px] top-4 rounded-[20px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[198px] rounded-[30px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[69px] rounded-[30px] bg-[#cae395]" />
          <p className="w-[117px] h-5 absolute left-[70px] top-[52px] text-xs text-center text-black">
            Todo
          </p>
          <p className="w-[136px] h-[18px] absolute left-[60px] top-[181px] text-xs text-center text-black">
            Done
          </p>
        </div>
        <div className="w-64 h-[312px] absolute left-[962px] top-[90px] overflow-hidden">
          <div className="w-[165px] h-[31px] absolute left-[45px] top-4 rounded-[20px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[198px] rounded-[30px] bg-[#cae395]" />
          <div className="w-[239px] h-[108px] absolute left-2 top-[69px] rounded-[30px] bg-[#cae395]" />
          <p className="w-[117px] h-5 absolute left-[70px] top-[52px] text-xs text-center text-black">
            Todo
          </p>
          <p className="w-[136px] h-[18px] absolute left-[60px] top-[181px] text-xs text-center text-black">
            Done
          </p>
        </div>
        <p onClick={()=>loadalluser()} className="w-[442px] h-[79px] absolute left-[434px] text-[64px] text-center text-white">
          ADMIN
        </p>
      </div>


    )

}
export default admin
import { signOut, useSession } from "next-auth/react";

const { data: session, status } = useSession();

const Logstate = function(){
    return(
        <div>
            <div>{status === "authenticated" ? (<button type="button" onClick={() => signOut()} className="w-[79px] h-[43px] bg-[#white] text-white" >로그아웃</button>) : (<button type="button" className="w-[79px] h-[43px] bg-[#white] text-white" ><a href='http://localhost:3000/api/auth/signin'>로그인</a></button>)}</div>
            <div>{status === "authenticated" ? (<div className="text-white">{session["user"]["email"]}님 반갑습니다.</div>) : (<div className="text-white"></div>)}</div>
        </div>

    )
}

export default Logstate
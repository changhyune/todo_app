import { NextPage } from "next";
import { useState } from "react";
import HIHELL from "../components/HIHI";
import Logstate from "../components/logstate";

const test: NextPage = () => {

    const [num ,setNum] = useState(0)

    function ppp(a){
        setNum(num+1)
        console.log(a)
    }


    return(
        <div>
            {num}
            <div onClick={()=>ppp(num)}> asdasd</div>
        </div>

    )
}

export default test
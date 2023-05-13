import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from './../../url';
import  './Emailverify.css' ;  

export const Emailverify = () => {
  const [state , setState] = useState("");
  const [flag,setFlag] = useState(true);
  const [timer,setTimer] = useState(5);
  const { id } = useParams();
  if(flag){
    setFlag(false)
    fetch(`${API}/users/verifyemail/${id}`)
    .then((response) =>{
      if(response.status === 200){
        setState("success")
      }else if(response.status === 404){
        // setState("invalid")
      }
    }).then().catch((err)=>console.log(err))
  }
  if(timer !==0){
    setTimeout(() => {
      setTimer(timer - 1)
    }, 1000);
  }

  return (
    <div>
    {state === 'success'?
     <div className="card1">
     <div className="cardComp1" >
       <i className="checkmark1">✓</i>
     </div>
       <h1 className='h11'>Success</h1> 
       <p className='p111' >Your Email is verified succesfully!<br/> You can login Now</p><br/>
       <hr/>
       <br/>
       <p className='p111'>Login page in : <b>{timer}</b></p>
     </div>
    :state === 'invalid'?<h1>Invalid</h1>:<></>}
    </div>
  )
}

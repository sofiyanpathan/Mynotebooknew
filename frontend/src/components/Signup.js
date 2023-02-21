import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Signup(props) {
  const [credentials,setcredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate=useNavigate()
    const handleSubmit=async(e)=>{

         e.preventDefault()
        //Api call
        const response=await fetch("http://localhost:5000/api/auth",{
          method:'POST',
          headers:{
            'content-Type':'application/json',
          },
          body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        }); 
        const json=await response.json()
        console.log(json)
        if(json.success){
              localStorage.setItem("token",json.authtoken)
              navigate("/")
              props.showalert("Account created succesfully","success")
        }
        else{
          props.showalert("Invalid Signup","danger")
        }
        
}
const onChange=(e)=>{

    setcredentials({...credentials,[e.target.name]:e.target.value})
 
  }

  return (
    <div>
       
      <form className='container my-2' onSubmit={handleSubmit}>
      <h2 >SignUp to use Inotebook</h2>
            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input type="name" className="form-control" id="name" name="name"  onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password"  onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="cpassword" className="form-control" id="cpassword" name="cpassword"  onChange={onChange} minLength={5}required/>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
     </form>
      
    </div>
  )
}

export default Signup

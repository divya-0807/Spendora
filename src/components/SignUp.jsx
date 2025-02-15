import React, { useState } from 'react'
import Input from './Input'
import {createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from '../firebase';


const SignUp = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")

  function SignUpWithEmail(event) {
    event.preventDefault(); 
    console.log(name);
    //authentication
    if(name!="" && email!="" && password!="" && confirmPassword!=""){
      if(password===confirmPassword){
        
      
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    // Signed up 
      const user = userCredential.user;
    console.log(user);
    toast.success("User Created!")
      //...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  toast.error(errorMessage);
  // ..
});

  
      }
      else{
        toast.error("Password do not match!")
      }
    }
    else{
      toast.error("All fields are mandatory")
    }
   
  }
  
  return (
    <div className='mt-[6%] flex justify-center items-center'>
      <div className="p-3  shadow-xl rounded-2xl h-[550px] w-[550px]">
        <h2 className='text-center mt-3 text-2xl' >Sign Up On <span className='text-blue-500 font-extrabold'>Spendora</span></h2>
        <form>
        <Input label={"Full Name"} 
          state={name}
          setState={setName}
          placeholder={"User Name"}/>
          <Input label={"Email"} 
          state={email}
          setState={setEmail}
          placeholder={"test123@gmail.com"}/>
          <Input label={"Password"}
          type="password"
          state={password}
          setState={setPassword}
          placeholder={"test123"}/>
          <Input label={"Confirm Password"}
          type="password" 
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"test@123"}/>
          <button className='cursor-pointer h-[30px] mx-[75px] mt-6  text-centre border w-[400px] border-blue-500 rounded text-blue-500 text-[15px] hover:bg-blue-500 hover:text-white'
           onClick={SignUpWithEmail}>Sign Up With Email & Password</button>
          <div className='text-center'>or</div>
          <button className='cursor-pointer h-[30px] mx-[75px] mt-2 text-centre border w-[400px] border-blue-500 rounded hover:bg-white hover:text-blue-500 text-[15px] bg-blue-500 text-white'>Sign Up Using Google</button>
          
        </form>
      
      </div>
    </div>
  )
}

export default SignUp

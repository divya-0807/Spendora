import React, { useRef, useState } from 'react'
import Input from './Input'
import {createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider} from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';


const SignUp = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [Loginform,Setloginform] = useState(false) ;
  const navigate = useNavigate();
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
    setName("");
    setEmail("");
    setConfirmPassword("");
    setPassword("");
    createDoc(user)
    navigate("/dashboard");
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
  function LoginUsingEmail(event){
    event.preventDefault();
    console.log("logged in");
    if( email!="" && password!="" ){
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("User Logged In!")
    navigate("/dashboard");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
  });

    }
    else{
      toast.error("All fields are mandatory.")
    }
    
  }

  async function createDoc(user){
    if(!user) return;

    const userRef = doc(db,"users",user.uid);
    const UserData = await getDoc(userRef);
    if(!UserData.exists()){
      try {
        await setDoc(doc(db, "users", user.uid), {
          name:user.displayName ? user.displayName : name,
          email,
          photoURL: user.photoURL?user.photoURL:"",
          createdAt: new Date(),
    
        });
        toast.success("Doc created")
      } catch (e) {
        toast.error(e.message);
      }
    }
    else{
      toast.error("Doc already exist");
    }
  }

  function googleAuth(event){
    event.preventDefault();
   try {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("user>>>",user);
      createDoc(user);
      navigate("/dashboard");
      toast.success("User Authenticated!")
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
    });
   } catch (e) {
    toast.error(e.message);
   }
  }
  
  return (
  <>
    {Loginform?
      <div className='mt-[6%] flex justify-center items-center'>
      <div className="p-3  shadow-xl rounded-2xl h-[550px] w-[550px]">
        <h2 className='text-center mt-3 text-2xl' >Login To <span className='text-blue-500 font-extrabold'>Spendora</span></h2>
        <form>
        
          <Input label={"Email"} 
          state={email}
          setState={setEmail}
          placeholder={"test123@gmail.com"}/>
          <Input label={"Password"}
          type="password"
          state={password}
          setState={setPassword}
          placeholder={"test123"}/>
          
          <button className='cursor-pointer h-[30px] mx-[75px] mt-6  text-centre border w-[400px] border-blue-500 rounded text-blue-500 text-[15px] hover:bg-blue-500 hover:text-white'
           onClick={LoginUsingEmail}>Login With Email & Password</button>
          <div className='text-center'>or</div>
          <button 
          onClick={googleAuth}
           className='cursor-pointer h-[30px] mx-[75px] mt-2 text-centre border w-[400px] border-blue-500 rounded hover:bg-white hover:text-blue-500 text-[15px] bg-blue-500 text-white'>
            Login Using Google</button>
            <p className='text-center w-full cursor-pointer' onClick={()=>Setloginform(!Loginform)}>Or Don't Have An Account? Click Here</p>

          
        </form>
      
      </div>
    </div>
    :
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
            <button
            onClick={googleAuth}
            className='cursor-pointer h-[30px] mx-[75px] mt-2 text-centre border w-[400px] border-blue-500 rounded hover:bg-white hover:text-blue-500 text-[15px] bg-blue-500 text-white'>
              Sign Up Using Google</button>
              <p className=' text-center w-full cursor-pointer' onClick={()=>Setloginform(!Loginform)}>Or Already Have An Account? Click Here</p>

            
          </form>
        
        </div>
      </div>
    }

  </>
  )
}

export default SignUp

import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Modal from '@/components/modals/Modal';
import classes from '@/styles/enterpage.module.css';
import toast from 'react-hot-toast';
type Props = {}

function LoginPage({}) {
  const router= useRouter();
    const [user, setUser] = useState({
       email: '',
       password:''
     });

const handleLoginUser= async ()=>{
    const fetchedData= await fetch('/api/login', {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({email:user.email, password:user.password})
    });
    const response = await fetchedData.json();

    const {user:userData, message}=response;

    if(message){ 
        toast.error(message);
    }else{
        await signIn('credentials', {password:user.password, email:user.email});
        router.push('/');
    }


}

     const modalUser = <div className=' p-8 h-96 sm:w-full lg:min-w-[30rem] lg:max-w-xl xl:min-w-[30rem] xl:max-w-2xl w-full rounded-xl bg-spotifyDarkGray flex flex-col justify-around gap-4'>
   <div className="flex flex-col gap-1">
   <label htmlFor="email">Email:</label>
   <input className='input focus:outline-0 focus:border-spotifyGreen border-2 border-spotifyGreen' type="email" onChange={(e)=>setUser((prev)=>{
prev.email= e.target.value;
return prev;
   })} name='email' id='email' required />
 </div>

 <div className="flex flex-col gap-1">
   <label htmlFor="password">Password:</label>
   <input className='input focus:outline-0 focus:border-spotifyGreen border-2 border-spotifyGreen' type="password" onChange={(e)=>setUser((prev)=>{
prev.password= e.target.value;
return prev;
   })} name='password' id='password' required />
 </div>
     
 <button onClick={handleLoginUser} className="btn rounded-full bg-spotifyGreen border border-spotifyDarkGray hover:border-spotifyGreen text-lg font-medium hover:bg-spotifyBlack hover:text-spotifyGreen text-spotifyBlack min-w-[20rem] self-center">Sign Up</button>

 <button className=' hover:underline transition-all'>I have already an account</button>
</div>;
     
    
  return (
    <div className='z-[100]'>
<Modal body={modalUser}/>
    </div>
  )
}

export default LoginPage
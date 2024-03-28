import React, {
  useEffect,
  useState,
} from 'react';

import {
  getSession,
  signIn,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  FaHeadphones,
  FaMicrophone,
  FaSpotify,
} from 'react-icons/fa6';

import Modal from '@/components/modals/Modal';
import classes from '@/styles/enterpage.module.css';
import LoginPage from '@/components/login/LoginModal';

type Props = {}

function EnterPage({}) {
const router = useRouter();
  const [selectedType, setSelectedType] = useState<String | null>(null);
  const [user, setUser] = useState({
     username:'',
    email: '',
    password:''
  });
  const [hasAccount, setHasAccount]=useState(false);
  const [artist, setArtist] = useState({
    firstName: '',
    lastName:'',
    username:'',
    email: '',
    password:''
  })



  useEffect(() => {
    getSession().then((result) => {
      if (result) {
        router.push('/');
      } else {
        return;
      }
    })
  }, [router]);


  const handleUserLogin = async () => {
    if (selectedType === 'listener') {
   await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ user, artist: null }),
      headers: {
        'Content-Type': 'application/json'
      }
   });
      
      await signIn('credentials', { email: user.email, password: user.password });
    } else {
       await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ user, artist }),
      headers: {
        'Content-Type': 'application/json'
      }
       });
    
      await signIn('credentials', { email: artist.email, password: artist.password });
}


  }

  
  const modalUser = <div className=' p-8 h-96 sm:w-full lg:min-w-[30rem] lg:max-w-xl xl:min-w-[30rem] xl:max-w-2xl w-full rounded-xl bg-spotifyDarkGray flex flex-col justify-around gap-4'>
        <div className="flex flex-col gap-1">
      <label htmlFor="username">User&apos;s name:</label>
      <input className='input focus:outline-0 focus:border-spotifyGreen border-2 border-spotifyGreen' type="text" name='username' id='username' onChange={(e)=>setUser((prev)=>{
prev.username= e.target.value;
return prev;
      })} required />
    </div>

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
        
    <button onClick={handleUserLogin} className="btn rounded-full bg-spotifyGreen border border-spotifyDarkGray hover:border-spotifyGreen text-lg font-medium hover:bg-spotifyBlack hover:text-spotifyGreen text-spotifyBlack min-w-[20rem] self-center">Sign Up</button>

    <button onClick={()=>setHasAccount(true)} className=' hover:underline transition-all'>I have already an account</button>
  </div>;

  const modalArtist = <div className=' p-8 sm:w-full xl:min-w-[30rem] xl:max-w-2xl w-full rounded-xl bg-spotifyDarkGray flex flex-col justify-around gap-4'>
     <div className="flex flex-col gap-1">
      <label htmlFor="firstname">First Name:</label>
      <input className='input focus:outline-0 focus:border-spotifyGreen border-2 border-spotifyGreen' onChange={(e)=>setArtist((prev)=>{
prev.firstName= e.target.value;
return prev;
      })} type="text" name='firstname' id='firstname' required />
    </div>

     <div className="flex flex-col gap-1">
      <label htmlFor="lastname">Last Name:</label>
      <input className='input focus:outline-0 focus:border-spotifyGreen border-2 border-spotifyGreen'   onChange={(e)=>setArtist((prev)=>{
prev.lastName= e.target.value;
return prev;
      })} type="text" name='lastname' id='lastname' required />
    </div>

     <div className="flex flex-col gap-1">
      <label htmlFor="username">Artist&apos;s name:</label>
      <input className='input focus:outline-0 focus:border-spotifyGreen border-2 border-spotifyGreen' type="text" onChange={(e)=>setArtist((prev)=>{
prev.username= e.target.value;
return prev;
      })} name='username' id='username' required />
    </div>
    
    <div className="flex flex-col gap-1">
      <label htmlFor="email">Email:</label>
      <input className='input focus:outline-0 focus:border-spotifyGreen border-2 border-spotifyGreen' type="text" onChange={(e)=>setArtist((prev)=>{
prev.email = e.target.value;
return prev;
      })} name='email' id='email' required />
    </div>

    <div className="flex flex-col gap-1">
      <label htmlFor="password">Password:</label>
      <input className='input focus:outline-0 focus:border-spotifyGreen border-2 border-spotifyGreen' type="text" onChange={(e)=>setArtist((prev)=>{
prev.password = e.target.value;
return prev;
      })} name='password' id='password' required />
    </div>
        
    <button onClick={handleUserLogin} className="btn rounded-full bg-spotifyGreen border border-spotifyDarkGray hover:border-spotifyGreen text-lg font-medium hover:bg-spotifyBlack hover:text-spotifyGreen text-spotifyBlack min-w-[20rem] self-center">Sign Up</button>

    <button onClick={()=>setHasAccount(true)} className=' hover:underline transition-all'>I have already an account</button>
  </div>;

  const conditionalModal = selectedType === 'artist' ? modalArtist : modalUser;

  return (
      <div className={`${classes['enter-page-bg']} w-full h-screen `}>
      <div className={`w-full h-full ${classes['enter-page-container']} z-50 flex justify-center items-center flex-col gap-6`}>
        <FaSpotify color='white' size={96} className='z-50'/>
        <p className=" text-2xl text-center font-medium z-50">Join and Enjoy your Favourite Music !</p>

        {!selectedType &&   
        <div className='grid grid-cols-2 gap-6'>
          <button onClick={()=>setSelectedType('listener')}  className="flex flex-col group transition-all hover:text-spotifyGreen hover:bg-spotifyMediumGray items-center z-50 bg-spotifyBlack py-8 px-12 gap-4 rounded-lg">
            <FaHeadphones className=' group-hover:-translate-y-1 transition-all group-hover:scale-105' size={32}/>
            <p className="transition-all group-hover:font-medium">Listener</p>
          </button>

         <button onClick={()=>setSelectedType('artist')} className="flex flex-col group transition-all hover:text-spotifyGreen hover:bg-spotifyMediumGray items-center z-50 bg-spotifyBlack py-8 px-12 gap-4 rounded-lg">
            <FaMicrophone className=' group-hover:-translate-y-1 transition-all group-hover:scale-105' size={32}/>
            <p className="transition-all group-hover:font-medium">Artist</p>
          </button>

</div>
        }
{selectedType && !hasAccount &&
          <Modal body={conditionalModal} />
   
}

{selectedType && hasAccount && <LoginPage />}
      </div>
    </div>
)
}

export default EnterPage
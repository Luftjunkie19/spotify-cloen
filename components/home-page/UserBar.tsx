import React, {
  useEffect,
  useState,
} from 'react';

import Image from 'next/image';
import { FaBell } from 'react-icons/fa6';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import Profile from '@/assets/frame_20_delay-0.1s.jpg';

type Props = {
  onPressProfile:()=>void
}

function UserBar({onPressProfile }: Props) {
  const [scrolledToPoint, setScrolledToPoint] = useState(false);

useEffect(()=>{

  console.log(window.screenY);
  const onScroll = () => setScrolledToPoint(window.scrollY > 40);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
},[])

  return (
    <div className={`flex transition sticky top-0 left-0 z-50 justify-between p-3 ${scrolledToPoint ? 'bg-spotifyDarkGray' : ''}`}>
      <button>
        <MdKeyboardArrowLeft className=' text-spotifyLightGray' size={24} />
      </button>
      
      <div className="flex gap-6">
        <button className="bg-white px-6 rounded-full h-auto">
      <p className='text-sm text-black font-bold'>
        Explore Premium
      </p>
        </button>
        <button>
          <FaBell className=" text-spotifyLightGray"/>
        </button>
        <button onClick={onPressProfile}>
          <Image src={Profile} alt='Profile' className='rounded-full w-8 h-8 object-cover'/> 
        </button>
      </div>
    </div>
  )
}

export default UserBar
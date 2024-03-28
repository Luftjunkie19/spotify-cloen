import React, { useState } from 'react';
import songDefault from '@/assets/539866.jpg'
import Image, { StaticImageData } from 'next/image';
import Marquee from 'react-fast-marquee';
import {
  FaCheckCircle,
  FaRegCheckCircle,
} from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { SlOptions } from 'react-icons/sl';
import useSongs from '@/hooks/useSongs';
import useCurrentUser from '@/hooks/useCurrentUser';

type Props = {
    title: string,
    artists:string[],
    imageURL: string,
    close:()=>void,
    songId:string,
}

function Cover({ title, imageURL, artists, close, songId }: Props) {
    const {data:songs}=useSongs();
    const {data:userData}=useCurrentUser();

    
    const handleLike=async ()=>{
     const fetchData= await fetch('/api/like', {
        method:'POST',
        body:JSON.stringify({songId:songId, likerId:userData.id}),
        headers:{
            'Content-Type':'application/json'
        }
     });

     const response = await fetchData.json();

     console.log(response);
        
    }

  return (
      <div className='flex flex-col gap-6 p-2 w-full'>
          <div className="flex justify-between gap-3">
              <p>{artists ? artists[0] : ''}</p>

              <button onClick={close}>
                  <IoCloseOutline size={24} />
              </button>
          </div>
              <Image width={144} height={144} className="rounded-lg object-cover sm:w-36 sm:h-36 lg:w-48 lg:h-48 self-center" src={imageURL ? imageURL : songDefault} alt={title} />
          
          <div className="flex justify-between gap-6 w-full ">
              <div className="flex flex-col gap-1">     
                  <Marquee speed={20} play={title ? title.trim().length > 10 : false} className='lg:w-1/2 xl:max-w-52' pauseOnHover autoFill={false} direction='right'>            
          <p className='text-xl px-1 tracking-wide font-bold'>{title}</p>
                  </Marquee>    
              <p className=' text-sm font-medium'>{artists ? artists.join(", ") : ''}</p>
              </div>
              
              <div className="flex gap-4">
                  <button onClick={handleLike}>{ userData && userData.favouriteSongs.includes(songId) ? <FaRegCheckCircle size={24} className='text-spotifyLightGray transition'/> : <FaCheckCircle size={24} className=' transtition text-spotifyGreen'/>}</button>
                  <button><SlOptions /></button>
              </div>
          </div>
    </div>
  )
}

export default Cover
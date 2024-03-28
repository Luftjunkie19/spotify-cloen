import React, { useState } from 'react';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import songImage from '@/assets/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg';
import {
  IoMusicalNoteOutline,
  IoPlayCircle,
} from 'react-icons/io5';

type Props = {
    cover: String, 
    title: String,
    artists:Array<String>
}

function NextSong({ artists, title, cover }: Props) {
    const [hovered, setHovered] = useState(true);
  return (
      <div className='flex bg-spotifyDarkGray flex-col gap-3 px-4 py-5 rounded-lg w-full'>
          <div className="flex justify-between">
              <p className='font-medium'>Next in queue</p>
              <button className=' text-sm font-bold hover:border-b-2 hover:border-b-white hover:text-white transition text-spotifyLightGray'>Open queue</button>
          </div>
          <div className="flex gap-6 items-center">    
              <button className='transition' onMouseLeave={()=>setHovered(false)} onMouseEnter={() => {
                  setHovered(true);  
              }}>
                  {!hovered ? <IoMusicalNoteOutline size={24} className={`transition text-spotifyLightGray ${hovered ? '-translate-y-full' : 'translate-y-0'}`} /> : <IoPlayCircle  size={24} className={` text-white ${!hovered ? '-translate-y-full' : 'translate-y-0'} transition text-spotifyLightGray`} />}
              </button>

                <Image className="w-8 h-8 rounded-md self-center" width={32} height={32} src={cover ? cover as string : songImage} alt={title ? title as string : ''} />

              <div className="w-1/2 flex flex-col gap-1">
                  <Marquee play={title ? title.trim().length > 15 : false}>        
              <p className='text-sm text-nowrap'>{title}</p>
                  </Marquee>
                  <Marquee play={title ? title.trim().length > 15 : false}>                      
              <p className='text-sm text-nowrap'>{artists ? artists.join(",") : ''}</p>
                  </Marquee>
          </div>
          </div>
    </div>
  )
}

export default NextSong
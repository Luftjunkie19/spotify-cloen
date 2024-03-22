import React, { useState } from 'react';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';
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
      <div className='flex bg-spotifyDarkGray flex-col gap-3 p-3 rounded-lg w-full'>
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

                <Image className="w-8 h-8 rounded-md self-center" src={''} alt={title as string} />

              <div className="lg:max-w-11 xl:max-w-24">
                  <Marquee>        
              <p className='text-sm text-nowrap'>{title}</p>
                  </Marquee>
                  <Marquee>                      
              <p className='text-sm text-nowrap'>{artists.join(",")}</p>
                  </Marquee>
          </div>
          </div>
    </div>
  )
}

export default NextSong
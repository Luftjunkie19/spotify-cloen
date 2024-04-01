import React from 'react';

import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import {
  FaList,
  FaShuffle,
} from 'react-icons/fa6';

import useCurrentUser from '@/hooks/useCurrentUser';

type Props = {}

function LibraryPage({ }: Props) {
  const { data } = useCurrentUser();
  return (
    <div className='w-full h-full'>
      {data && <>
      <div className="flex mx-6 my-4 gap-6 items-center">
          <Image  className='rounded-lg object-cover w-48 h-48' width={56} height={60} src={'https://i.pinimg.com/474x/e5/4f/19/e54f19d0ea4c93db35885d386d9b9677.jpg'} alt='width'/>
<div className="flex flex-col gap-4">
  <p>Playlist</p>
          <p className="text-7xl font-medium">Liked Songs</p>
         <div className="flex items-center gap-6">
         <div className="flex gap-2 items-center">
          <Image src={data.profileImg} alt="" width={32} height={32} className="w-8 h-8 rounded-full"/>
          <p className="text-sm">{data.username}</p>
         </div>


          <p className="text-sm">{data.favouriteSongs.length} Songs</p>
         </div>
</div>
      </div>

<div className="flex flex-col bg-spotifySpecificOpacityGreen h-3/4">
          <div className="flex justify-between px-2 items-center">
            <div className="flex gap-6 p-2 items-center">
              <button className="p-5 rounded-full bg-spotifyGreen">
                <FaPlay className="text-spotifyDarkGray"/>
              </button>
              <div className="flex gap-4">     
              <button> <FaShuffle size={28} />  </button>
              </div>

            </div>
        <div>
          <button><FaList size={20} /></button>
        </div>
    
</div>

</div>
        
      </>
      }

    </div>
  )
}






export default LibraryPage
import React from 'react';

import Image from 'next/image';
import { FaPlay } from 'react-icons/fa6';

import { genres } from '@/assets/MusicGenres';

type Props = {
  closedRight: boolean;
}

function MusicGenres({closedRight}: Props) {
  const colourArray = ['bg-red-300', ' bg-yellow-500', 'bg-green-200', 'bg-blue-400', 'bg-purple-600', 'bg-pink-700', ' bg-red-700'];

  return (
    <div className='flex flex-col gap-2'>
      <p className='px-4 font-medium text-2xl'>The Best music-genres:</p>
      <div className={`grid snap-always snap-mandatory gap-4 sm:auto-cols-[50%] md:auto-cols-[35%]  ${closedRight ? 'lg:auto-cols-[40%]' : 'lg:auto-cols-[25%]'} sm:overflow-x-auto snap-inline sm:grid-flow-col xl:snap-none ${closedRight ? 'xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6' : 'xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-9'} px-4`}>
      {genres.slice(0, 4).map((genre, i) => (<div className={`flex overflow-hidden cursor-pointer group snap-always snap-center flex-col relative top-0 left-0 gap-2`} key={i}>
        <div className="relative overflow-hidden top-0 left-0 w-full h-36">
       { genre.image &&  <Image src={genre.image} alt='' className={`w-full h-36 rounded-lg object-cover ${colourArray[i]}`} />}
          <div className="bg-spotifyOpacityDarkGray duration-500 transition-all group-hover:top-0 group-hover:opacity-100 opacity-0 absolute top-full left-0 w-full h-full"></div>
          <button className="transition-all duration-500 group-hover:bottom-0 group-hover:opacity-100 absolute opacity-0 -bottom-full right-0 m-2 p-3 rounded-full bg-spotifyGreen">
            <FaPlay className="text-spotifyBlack group-hover:opacity-100 transition-all delay-150 opacity-0" size={20} />
</button>
        </div>
        <h2 className="sm:text-lg xl:text-base font-black">{genre.genre}</h2>
       </div>))}
    </div></div>
  )
}

export default MusicGenres



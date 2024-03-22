import React from 'react';

import Image from 'next/image';
import { FaPlay } from 'react-icons/fa6';

import { genres } from '@/assets/MusicGenres';

type Props = {}

function MusicGenres({}: Props) {
  const colourArray = ['bg-red-300', ' bg-yellow-500', 'bg-green-200', 'bg-blue-400', 'bg-purple-600', 'bg-pink-700', ' bg-red-700'];

  return (
      <div className='grid snap-always snap-mandatory gap-4 sm:auto-cols-[45%] md:auto-cols-[40%] sm:overflow-x-auto snap-inline sm:grid-flow-col xl:snap-none xl:grid-cols-4 2xl:grid-cols-6 px-4'>
      {genres.slice(0, 4).map((genre, i) => (<div className={`flex snap-always snap-center flex-col relative top-0 left-0 gap-2`} key={i}>
        <div className="relative top-0 left-0 w-full h-36">
        <Image src={genre.image} alt='' className={`w-full h-36 rounded-lg object-cover ${colourArray[i]}`} />
          <button className="absolute bottom-0 right-0 m-2 p-3 rounded-full bg-spotifyGreen">
            <FaPlay className="text-spotifyBlack" size={20} />
</button>
        </div>
        <h2 className="text-xl font-black">{genre.genre}</h2>
       </div>))}
    </div>
  )
}

export default MusicGenres
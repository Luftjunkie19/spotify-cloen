import React from 'react';

import Image from 'next/image';
import { FaShuffle } from 'react-icons/fa6';
import { HiSpeakerWave } from 'react-icons/hi2';
import { IoIosSkipForward } from 'react-icons/io';
import { IoPlayCircle } from 'react-icons/io5';
import { MdSkipPrevious } from 'react-icons/md';
import { RxLoop } from 'react-icons/rx';

import image from '@/assets/79e6eef3-3268-4d46-9435-19f3ab6fcd50.webp';

type Props = {}

function BottomPlayBar({}: Props) {
  return (
      <div className='fixed bottom-0 left-0 w-full pt-2 px-4 bg-spotifyBlack h-20 z-50 flex justify-between'>
      <div className="flex gap-6 items-center ">
        <Image className="w-12 h-12 rounded-md" src={image} alt='' />
        <div className="flex flex-col justify-center">
          <p className="font-medium cursor-pointer hover:underline transition">Es Tut Mir Leid</p>
          <p className="text-xs  cursor-pointer hover:underline transition text-spotifyLightGray">Capital Bra</p>
        </div>
          </div>

           <button className='sm:block lg:hidden'><IoPlayCircle size={32} /></button>
      
      <div className="sm:hidden lg:flex flex-col gap-2 self-center">
        <div className="flex gap-8 self-center">
          <button><FaShuffle size={28}/></button>
          <button><MdSkipPrevious size={28}/></button>
          <button><IoPlayCircle size={28} /></button>
          <button><IoIosSkipForward  size={28}/></button>
          <button><RxLoop  size={28}/></button>
      </div>
        <div className="flex gap-3 items-center py-2">
        <p className="text-xs text-spotifyLightGray">0:00</p>  
        <input className="range range-xs lg:w-80 xl:w-96 [--range-shdw:#1db954]" type="range" name="" id="" />
<p className="text-xs text-spotifyLightGray">-2:50</p>
      </div>
      </div>
      
      <div className=" sm:hidden lg:flex items-center gap-2">
        <button>
<HiSpeakerWave size={24} />
        </button>
<input className="range range-xs max-w-28 [--range-shdw:#1db954]"  type="range" name="" id="" />

      </div>
      
    </div>
  )
}

export default BottomPlayBar
import React, { useRef } from 'react';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { AiOutlinePlaySquare } from 'react-icons/ai';
import {
  FaCheckCircle,
  FaPauseCircle,
} from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { HiSpeakerWave } from 'react-icons/hi2';
import { IoIosSkipForward } from 'react-icons/io';
import { IoPlayCircle } from 'react-icons/io5';
import { MdSkipPrevious } from 'react-icons/md';
import { RxLoop } from 'react-icons/rx';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { playMusicActions } from '@/contexts/PlayMusicContext';

type Props = {
  rightClosed: boolean,
  toggleRight: () => void
}

function BottomPlayBar({ rightClosed, toggleRight }: Props) {
  const songCover = useSelector((state: any) => state.playmusic.imageUrl);
  const  isPlaying = useSelector((state:any)=>state.playmusic.isPlaying);
  const songTitle = useSelector((state: any) => state.playmusic.title);
  const songPath = useSelector((state: any) => state.playmusic.songPath);
  const artists = useSelector((state: any) => state.playmusic.artists);
  const dispatch = useDispatch();
  const audioReference = useRef(null);


  const toggleSong=()=>{
    const audioData = audioReference.current;
    if (!audioData) {
      return;
    }
    dispatch(playMusicActions.togglePlayingSong());

    if (audioData.playing) {
      audioData.pause();
    } else {
      audioData.play();
    }

  }


  return (
    <div className={`fixed ${songCover ? 'flex' : 'hidden'} bottom-0 left-0 w-full pt-2 px-4 bg-spotifyBlack h-20 z-50 justify-between`}>
      <div className="flex gap-6 items-center ">
        <Image className="w-12 h-12 rounded-lg" width={48} height={48} src={songCover ? songCover : ''} alt='' />
        <div className="flex flex-col justify-center">
          <Marquee speed={20} direction={'right'} pauseOnHover  className="max-w-24">
    
            <p className="font-medium cursor-pointer hover:underline transition px-1">{songTitle ? songTitle : ''}</p>
       
          </Marquee>
          <p className="text-xs text-nowrap cursor-pointer hover:underline transition text-spotifyLightGray">{artists ? artists.join(', ') : ''}</p>
        </div>
          </div>

      <div className="sm:flex lg:hidden gap-6">
        <button className='sm:block lg:hidden'><FaCheckCircle className="text-spotifyGreen" size={24}/></button>
           <button onClick={toggleSong} className='sm:block lg:hidden'> {!isPlaying ? <FaPauseCircle size={36}/> : <IoPlayCircle size={36} />}</button>
      </div>
      
      <div className="sm:hidden lg:flex flex-col gap-2 self-center">
        <div className="flex gap-8 self-center">
          <button><FaShuffle size={24}/></button>
          <button><MdSkipPrevious size={24} /></button>
          <audio ref={audioReference} src={songPath}></audio>
          <button onClick={toggleSong}>
            {isPlaying ? <FaPauseCircle size={36}/> : <IoPlayCircle size={36} />}
            </button>
          <button><IoIosSkipForward  size={24}/></button>
          <button><RxLoop  size={24}/></button>
      </div>
        <div className="flex gap-1 items-center py-2">
          <p className="text-xs text-spotifyLightGray">0:{audioReference.current && audioReference.current.currentTime}</p>  
        <input className="range range-xs lg:w-80 xl:w-96 [--range-shdw:#1db954]" type="range" name="" id="" />
          <p className="text-xs text-spotifyLightGray">-{audioReference.current && Math.round(audioReference.current.duration / 60)}:{`${audioReference.current && audioReference.current.duration < 10 ? `0${Math.round(audioReference.current.duration)}` : `${audioReference.current && Math.round(audioReference.current.duration)}`}`} </p>
      </div>
      </div>
      

      <div className="sm:hidden lg:flex gap-4">
        <button className="sm:hidden lg:block" onClick={toggleRight}>
<AiOutlinePlaySquare className={`${!rightClosed ? 'text-white' : 'text-spotifyGreen'}`} size={20}/>
        </button>
      <div className=" sm:hidden lg:flex items-center gap-2">
        <button>
<HiSpeakerWave size={20} />
        </button>
<input className="range range-xs max-w-24 [--range-shdw:#fff]"  type="range" min={0} value={audioReference.current && audioReference.current.currentTime} max={audioReference.current && audioReference.current.duration}  name="" id="" />

      </div>
      </div>
      
    </div>
  )
}

export default BottomPlayBar
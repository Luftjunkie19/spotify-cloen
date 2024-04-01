import React, { useRef } from 'react';

import Image from 'next/image';

import useArtist from '@/hooks/useArtist';
import useListenedSong from '@/hooks/useListenedSong';

type Props = {
  musicSource: string,
  artist:  string,
  title:    string,
  songId:string,
  morethan1Number?:number,
  imageUrl?: string,
}

function SongItem({musicSource, artist, songId, title, morethan1Number, imageUrl}:Props) {
 const songRef=useRef<HTMLAudioElement>(null);
 const songData= songRef.current;
 const {data:listenedTimes}=useListenedSong(songId);
 const {data:artistData}=useArtist({artistId:artist as string});
  return (
    <div className="flex p-3 mx-4 justify-between items-center hover:bg-spotifyOpacityDarkGray rounded-lg  transition-all hover:-translate-y-1 cursor-pointer">
    <div className="flex gap-6 items-center">
      {imageUrl ? <Image width={40} height={40} alt='' className='w-10 h-10 rounded-lg' src={imageUrl}/> :  <p className=' text-lg text-spotifyLightGray font-medium'>{morethan1Number ? morethan1Number : 1}</p>}
     
      <div className="">
      <p>{title}</p>
{!imageUrl &&  <p className='text-sm text-spotifyLightGray'>{artistData && artistData.artist.username}</p>}
      </div>
    </div>
    
      <p className=' text-spotifyLightGray'>{listenedTimes}</p>
  
    <div className="">
     <audio ref={songRef} src={musicSource}></audio>
     {songData && <p className='text-spotifyLightGray'>{`${Math.floor(songData.duration/60) < 10 ? `0${Math.floor(songData.duration / 60)}` : Math.floor(songData.duration / 60)}:${Math.floor(songData.duration) < 10 ? `0${Math.floor(songData.duration)}` : Math.floor(songData.duration)}`}</p>}
    </div>
  </div>
  )
}

export default SongItem
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { FaPlay } from 'react-icons/fa';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import SongSkeleton from '@/components/skeletons/SongSkeleton';
import { playMusicActions } from '@/contexts/PlayMusicContext';
import useCurrentUser from '@/hooks/useCurrentUser';
import useSongs from '@/hooks/useSongs';
import useUsers from '@/hooks/useUsers';

type Props = {}

function SearchSongItem({ }: Props) {
  const { data, isLoading } = useSongs();
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: userData } = useCurrentUser();
  const closedRight = useSelector((state: any) => state.playmusic.showRightBar);
    const conditionalAdShow= userData && !userData.isSubscribed && (new Date().getTime() -  new Date(userData.pastFromLastAds).getTime()) / 60000 >= 30;
  const dispatch = useDispatch();
  const handleSong = (song: any) => {
    if(conditionalAdShow && userData){
      
      dispatch(playMusicActions.startSong({songPath:'./advertisement/spotifyAd.mp3', imageUrl:null, artists:['Clonify'], title:'Advertistement', songId:'AddVertisement'}));
    }else{

      const artist = users.find((userData: any) => userData.id === song.artistId)?.username;
      dispatch(playMusicActions.startSong({songCover:song.songCover, songLength:0, songPath:song.musicPath, title:song.title, artistList:[artist], songId:song.id}))
    }
  }

  return (
   <>
    {isLoading && new Array().fill(0, 0, 6).map((item, i) => <SongSkeleton key={i} />)}

{!isLoading && data && data.slice(0, closedRight ? 4 : 6).map((song:any, i:any) => (<Link href={`/song/${song.id}`} className={`flex hover:bg-spotifyOpacityDarkGray py-2 px-1 transition-all duration-500 rounded-lg overflow-hidden cursor-pointer group snap-always snap-center flex-col relative top-0 left-0 gap-2`} key={i}>
  <div className="relative overflow-hidden top-0 left-0 w-full h-36">
   {song.songCover ?  <Image width={148} height={144} src={song.songCover} alt='' className={`w-full h-36 rounded-lg object-cover `} /> : null}
    <div className="bg-spotifyOpacityDarkGray duration-500 transition-all group-hover:top-0 group-hover:opacity-100 opacity-0 absolute top-full left-0 w-full h-full"></div>
    <button onClick={()=>handleSong(song)} className="transition-all duration-500 group-hover:bottom-0 group-hover:opacity-100 absolute opacity-0 -bottom-full right-0 m-2 p-3 rounded-full bg-spotifyGreen">
      <FaPlay className="text-spotifyBlack group-hover:opacity-100 transition-all delay-150 opacity-0" size={20} />
</button>
  </div>
  <h2 className="sm:text-lg xl:text-base font-black lg:hidden">{song.title.trim().length >= 10 ? `${song.title.slice(0, 7)}...` : song.title}</h2>
  <Marquee className='sm:hidden lg:block' direction="right" pauseOnHover play={song.title.trim().length >= 15}>
    <h2 className='font-black sm:hidden lg:block px-1'> {song.title} </h2>
  </Marquee>
  <p>{!usersLoading && users ? users.find((userData:any)=>userData.id === song.artistId).username : 'Loading...'}</p>
 </Link>))}
   </>
  )
}

export default SearchSongItem
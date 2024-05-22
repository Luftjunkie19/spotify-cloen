import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { playMusicActions } from '@/contexts/PlayMusicContext';
import useSongs from '@/hooks/useSongs';

import Cover from './layout/right-bar/Cover';
import NextSong from './layout/right-bar/NextSong';

function RightBar() {
  const songCover = useSelector((state: any) => state.playmusic.imageUrl);
  const isPlaying = useSelector((state: any) => state.playmusic.isPlaying);
  const songTitle = useSelector((state: any) => state.playmusic.title);
  const artists = useSelector((state: any) => state.playmusic.artists);
  const showRight = useSelector((state: any) => state.playmusic.showRightBar);
const songId= useSelector((state:any)=>state.playmusic.songId);
  const dispatch = useDispatch();

  //Next song data
  const nextSongCover=useSelector((state: any) => state.nextSong.imageUrl);
  const nextSongArtists=useSelector((state: any) => state.nextSong.artists);
  const nextSongTitle=useSelector((state: any) => state.nextSong.title);
  const nextSongId=useSelector((state: any) => state.nextSong.songId);
  const nextSongPath= useSelector((state: any) => state.nextSong.songPath);


  const onClose = () => {
    dispatch(playMusicActions.closeRightBar());
  }

  return (
    <div className={`border-l-spotifyMediumGray ${!showRight ? 'hidden' : 'sm:hidden lg:block'} lg:w-[18rem] xl:max-w-sm w-full  border-l p-4`}>
      <Cover songId={songId} close={onClose} title={songTitle} artists={artists} imageURL={songCover} />  


{nextSongId && 
      <NextSong title={nextSongTitle} cover={nextSongCover} artists={nextSongArtists}/>
}

    </div>
  )
}

export default RightBar
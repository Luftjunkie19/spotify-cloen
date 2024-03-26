import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { playMusicActions } from '@/contexts/PlayMusicContext';

import Cover from './layout/right-bar/Cover';
import NextSong from './layout/right-bar/NextSong';

function RightBar() {
    const songCover = useSelector((state: any) => state.playmusic.imageUrl);
  const  isPlaying = useSelector((state:any)=>state.playmusic.isPlaying);
  const songTitle = useSelector((state: any) => state.playmusic.title);
  const artists = useSelector((state: any) => state.playmusic.artists);
  const showRight = useSelector((state: any) => state.playmusic.showRightBar);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(playMusicActions.closeRightBar());
  }

  return (
    <div className={`border-l-spotifyMediumGray ${!showRight ? 'hidden' : 'sm:hidden lg:block'} lg:col-span-4 xl:col-span-3 border-l p-4 w-full h-full`}>
      <Cover close={onClose} title={songTitle} artists={artists} imageURL={songCover} />  

      <NextSong title={songTitle} cover={songCover} artists={artists}/>
    </div>
  )
}

export default RightBar
import MusicGenres from '@/components/home-page/tabs/MusicGenres';
import React from 'react';
import { useSelector } from 'react-redux';


function SearchPage() {
  const showRight = useSelector((state: any) => state.playmusic.showRightBar);
  return (
      <div className='w-full h-full'>
  <MusicGenres closedRight={showRight} />
      </div>
  )
}

export default SearchPage
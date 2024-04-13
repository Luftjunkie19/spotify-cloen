import AlbumItem from '@/components/home-page/items/AlbumItem';
import MusicGenres from '@/components/home-page/tabs/MusicGenres';
import useAlbums from '@/hooks/useAlbums';
import usePlaylists from '@/hooks/usePlaylists';
import useSongs from '@/hooks/useSongs';
import React from 'react';
import { useSelector } from 'react-redux';


function SearchPage(props) {

const {data:songs}=useSongs();
const {data:albums}=useAlbums();
const {data:playlists}=usePlaylists();

  const showRight = useSelector((state: any) => state.playmusic.showRightBar);
  return (
      <div className='w-full h-full flex flex-col gap-2'>
  <MusicGenres closedRight={showRight} />
  <div className={`grid snap-always snap-mandatory gap-4 sm:auto-cols-[50%] md:auto-cols-[25%] lg:auto-cols-[24%] sm:overflow-x-auto snap-inline sm:grid-flow-col xl:snap-none ${showRight ? 'xl:grid-cols-4 2xl:grid-cols-5' : 'xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8'} px-4`}>
  {albums && albums.map((album:any, i:any)=>(<AlbumItem id={album.id} songsLength={album.songs.length} imageUrl={album.imageUrl} key={i} name={album.name}/>))}
  </div>
  <div className={`grid snap-always snap-mandatory gap-4 sm:auto-cols-[50%] md:auto-cols-[25%] lg:auto-cols-[24%] sm:overflow-x-auto snap-inline sm:grid-flow-col xl:snap-none ${showRight ? 'xl:grid-cols-4 2xl:grid-cols-5' : 'xl:grid-cols-6 2xl:grid-cols-6 3xl:grid-cols-8'} px-4`}>
  {songs && songs.map((songItem:any, i:any)=>())}     
    </div>

      </div>
  )
}

export default SearchPage
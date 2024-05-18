import React from 'react';
import { InferGetStaticPropsType } from "next";
import { useRouter } from 'next/router';
import usePlaylists from '@/hooks/usePlaylists';
import SongItem from '@/components/home-page/items/SongItem';
import { BsThreeDots } from 'react-icons/bs';
import { FaClock, FaList, FaPause, FaPlay, FaPlusCircle } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import useSongs from '@/hooks/useSongs';
import { useSelector } from 'react-redux';
import useUsers from '@/hooks/useUsers';

type Props = {}

function PlaylistPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
const isPlaying=useSelector((state:any)=>state.playmusic.isPlaying);
  const router=useRouter();
  const {playlistId}=router.query;

  const {data}=usePlaylists(playlistId as string);
  const {data:userObject}=useUsers(data?.creatorId!);
  const {data:songsData}=useSongs();

  const handlePlay=()=>{};
  
  const foundSongs = songsData && data && data.songs.map((item:any)=>{
    const songObject=  songsData.find((x: any) => x.id === item );
 
return songObject;

  })

  return (
    <div className='w-full h-full bg-spotifySpecificOpacityGreen'>
    {data && <>
    <div className="flex gap-6 p-4">
    <Image width={192} height={192} src={data.imageUrl} alt='cover' className='w-48 h-48 object-cover rounded-md'/>
<div className="flex flex-col gap-8">
<p className="text-xs">Playlist</p>
<p className='font-medium sm:text-2xl lg:text-6xl 2xl:text-8xl'>{data.name}</p>
<div className="">
  {data && userObject && <div className='flex gap-6  items-center'>
<Image width={48} height={48} alt='' className='rounded-full w-12 h-12 object-cover border-2 border-spotifyGreen' src={userObject.profileImg}/>
<Link className='hover:font-medium hover:underline' href={`/users/${userObject.id}`}>{userObject.username}</Link>  
<p>{format(data.createdAt as string, "do MMMM yyyy")}</p>
  </div>
  }
</div>
</div>
    </div>
<div className="w-full bg-spotifyOpacityDarkGray">
<div className="flex p-4 justify-between">
  <div className="flex gap-8">
    <button onClick={handlePlay} className=' bg-spotifyGreen p-4 rounded-full'>
      {isPlaying ? <FaPause className='text-black' size={18}/> :  <FaPlay className='text-black' size={18}/>}
    </button>
    <div className="flex gap-4">
      <button><FaShuffle size={30}/></button>
      <button><FaPlusCircle size={30}/></button>
      <button><BsThreeDots size={30}/></button>
    </div>
  </div>

  <button><FaList/></button>
</div>
<div className="flex p-4 mx-4 justify-between border-b-2 border-b-spotifyMediumGray m-0">
 <div className="flex gap-2">
  <p>#</p>
  <p>Title</p>
 </div>
  <p>Plays</p>
  <FaClock/>
</div>

{data && foundSongs && <>
{foundSongs && foundSongs.map((item:any, i:any)=>(<SongItem morethan1Number={i + 1} songId={item?.id as string} key={i} artist={item.artistId as string} musicSource={item.musicPath as string} title={item.title} />))}
</>}

</div>

    </>}
    
    </div>
  )
}

export default PlaylistPage

export const getStaticPaths= async ()=>{
  const data= await fetch('http://127.0.0.1/api/playlist/playlists');
  const  playlists = await data.json();

  const convertedPlaylists= playlists.map((item:any) => ({ params: { playlistId: item.id }}));

return {
  paths:convertedPlaylists,
  fallback: 'blocking',
}
}

export const getStaticProps = async () => {
  const data= await fetch(`http://127.0.0.1/api/playlist/playlists`);
  const  playlists = await data.json();



  return {props:{playlists}};
}
import React from 'react';

import { format } from 'date-fns';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsThreeDots } from 'react-icons/bs';
import {
  FaClock,
  FaList,
  FaPause,
  FaPlay,
  FaPlusCircle,
} from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

import SongItem from '@/components/home-page/items/SongItem';
import useAlbums from '@/hooks/useAlbums';
import useSongs from '@/hooks/useSongs';
import useUsers from '@/hooks/useUsers';

type Props = {}

function AlbumPage({}) {

    const isPlaying=useSelector((state:any)=>state.playmusic.isPlaying);
    const router=useRouter();
    const {albumId}=router.query;
  
    const {data}=useAlbums(albumId as string);
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
  <p className="text-xs">Song</p>
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
  <div className="sm:hidden md:flex p-4 mx-4 justify-between border-b-2 border-b-spotifyMediumGray m-0">
   <div className="flex gap-2">
    <p>#</p>
    <p>Title</p>
   </div>
    <p>Plays</p>
    <FaClock/>
  </div>
  {data && foundSongs && <div className='sm:hidden lg:block'>
{foundSongs && foundSongs.map((item:any, i:any)=>(<SongItem morethan1Number={i + 1} songId={item?.id as string} key={i} artist={item.artistId as string} musicSource={item.musicPath as string} title={item.title} />))}
</div>}
 
</div>

      </>}
      
      </div>
  )
}

export default AlbumPage


// export const getStaticPaths= async ()=>{
//     const data= await fetch('http://localhost:3000/api/album/albums');
//     const  albums = await data.json();
  
//     const convertedAlbums= albums.map((item:any) => ({ params: { albumId: item.id }}));
  
//   return {
//     paths:convertedAlbums,
//     fallback: 'blocking',
//   }
//   }
  
//   export const getStaticProps = async () => {
//     const data= await fetch('http://localhost:3000/api/album/albums');
//     const  albums = await data.json();
  
  
  
//     return {props:{albums}};
//   }
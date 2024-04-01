import React from 'react'
import { InferGetStaticPropsType } from "next";
import useUsers from '@/hooks/useUsers';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useListenedSong from '@/hooks/useListenedSong';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaPlay } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';
import useArtist from '@/hooks/useArtist';
import SongItem from '@/components/home-page/items/SongItem';
type Props = {}

function UserDetailedPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
const router= useRouter();
const {userId}=router.query;
const {data}=useUsers(userId as string);
const {data:artistData}=useArtist({artistId:userId as string});


  return (
    <div className='w-full h-full bg-spotifySpecificOpacityGreen'>
{
    data && <>
    <div className="w-full h-64 relative top-0 left-0">
    <Image height={256} width={256} alt='Profile Img' src={data.profileImg} className='w-full object-cover max-h-64'/>
<div className="flex flex-col justify-end px-6 py-2 gap-2 h-full w-full bg-spotifyOpacityDarkGray absolute bottom-0 left-0">
    <p className='text-sm flex gap-4 items-center'><RiVerifiedBadgeFill size={30} className=' text-blue-400'/> Clonify Artist</p>
    <p className='text-7xl font-medium'>{data.username}</p>
    <p className='text-sm'>{artistData && artistData.listenedSongs.length} Monthly Listeners</p>
</div>
    </div>

    <div className="flex gap-8 px-4 py-4">
        <button className="bg-spotifyGreen p-5 rounded-full">
            <FaPlay className='text-black'/>
        </button>
        <div className="flex gap-6 items-center">
            <button><FaShuffle size={30}/></button>
            <button className='border h-min text-sm font-medium py-2 px-5 border-spotifyLightGray rounded-full'>Follow</button>
            <button><BsThreeDots size={30}/></button>
        </div>
    </div>

    <div className="flex flex-col gap- px-4 my-6">
        <p className="font-medium text-2xl">Popular</p>
        {artistData && 
        <div className="flex flex-col">
            {artistData.songs.map((item:any, i:any)=>(<SongItem imageUrl={item.songCover} key={i} morethan1Number={i + 1} title={item.title} songId={item.id} musicSource={item.musicPath} artist={item.artistId}/>))}
        </div>
        }
    </div>
    </>
}

    </div>
  )
}

export default UserDetailedPage


export const getStaticPaths= async () =>{
    const fetchData= await fetch('http://localhost:3000/api/users/allUsers');

    const users= await  fetchData.json();

    const convertedUsers= users.map((item:any)=>({params:{userId:item.id}}));

    return {
        paths:convertedUsers,
        fallback:'blocking'
    }
}

export const getStaticProps=async ()=>{
    const fetchData= await fetch('http://localhost:3000/api/users/allUsers');

    const users= await  fetchData.json();

    return {props:{users}}
}
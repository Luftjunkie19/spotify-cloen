import React from 'react';

import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsThreeDots } from 'react-icons/bs';
import {
  FaCircle,
  FaPlay,
} from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

import SongItem from '@/components/home-page/items/SongItem';
import useAlbums from '@/hooks/useAlbums';
import useArtist from '@/hooks/useArtist';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUsers from '@/hooks/useUsers';

type Props = {}

function UserDetailedPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
const router= useRouter();
    const { data: currentUser } = useCurrentUser();
const {userId}=router.query;
const {data}=useUsers(userId as string);
const {data:artistData}=useArtist({artistId:userId as string});
    const { data: albums } = useAlbums();

    const handlePost= async ()=>{
    await fetch(`/api/follow/${data.id}`, {
            method: "POST",
            body: JSON.stringify({ artistId: userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });

    }

  return (
    <div className='w-full min-h-screen bg-spotifySpecificOpacityGreen'>
{
    data && <>
    <div className="w-full sm:h-64 2xl:h-80 relative top-0 left-0">
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
                          {currentUser && currentUser.id !== userId && 
        <button onClick={handlePost} className='border h-min text-sm font-medium py-2 px-5 border-spotifyLightGray rounded-full'>{currentUser && currentUser.followed.includes(userId) ? 'Unfollow' : 'Follow'}</button>
            }
            <button><BsThreeDots size={30}/></button>
        </div>
    </div>

    <div className="flex flex-col gap- px-4 my-6">
        <p className="font-medium text-2xl">Popular</p>
        {artistData && 
        <>
        <div className="sm:hidden lg:flex flex-col">
                              {artistData.songs.map((item: any, i: any) => (<SongItem imageUrl={item.songCover} key={i} morethan1Number={i + 1} title={item.title} songId={item.id} musicSource={item.musicPath} artist={item.artistId} />))}
                          </div>
                          <div className='sm:flex lg:hidden flex-col gap-3'>
                              {artistData.songs.map((item: any, i: any) => (<div key={i} className="flex gap-4">

<Image src={item.songCover} width={48} height={48} className='w-24 h-24 rounded-lg object-cover' alt=''/>
                                  
                    <div className="flex flex-col gap-2 justify-center">
                                      <p className="font-medium text-xl">{item.title}</p>
                                      <div className='flex gap-2 items-center text-spotifyLightGray'>
                                          <p className="">{new Date(item.releaseDate).getFullYear()} </p>
                                          <FaCircle size={8}/>
                                      <p>Song</p>    
                                      </div>
                    </div>

                              </div>))}
                          </div>

<p className="font-medium text-2xl mb-2">Albums</p>
                          <div className="grid sm:grid-flow-cols lg:grid-cols-4 xl:grid-cols-6 3xl:grid-cols-7">
                                  {albums && albums.filter((item: any) => item.creatorId === artistData.artist.id).map((item: any) => (<Link key={item.id} href={`/album/${item.id}`} className="flex gap-2 flex-col w-fit rounded-lg transition-all p-4 hover:bg-spotifyDarkGray">
                                  <Image src={item.imageUrl} alt='' width={32} height={32} className='w-40 h-40 object-cover rounded-lg' />
                                  <p className="font-medium text-lg">{item.name}</p>
                                <div className="flex gap-2 items-center text-spotifyLightGray">
                                  <p>{new Date(item.createdAt).getFullYear()}</p>
                                  <FaCircle size={8}/>
                                <p>Album</p>
                                </div>
                              </Link>))}
                          </div>
        </>
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
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import useAlbums from '@/hooks/useAlbums';

type Props = {}

function RecentAlbums({}: Props) {
const {data}=useAlbums();
const closedRight = useSelector((state:any)=>state.playmusic.showRightBar);
  return (
   <>
   <p className="text-2xl px-4 font-medium">Recently added Playlists: </p>
   <div className={`grid snap-always snap-mandatory gap-4 sm:auto-cols-[50%] md:auto-cols-[25%] lg:auto-cols-[24%] sm:overflow-x-auto snap-inline sm:grid-flow-col xl:snap-none ${closedRight ? 'xl:grid-cols-4 2xl:grid-cols-5' : 'xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8'} px-4`}>
       {data && data.map((item:any, i:any)=>(<Link href={`/album/${item.id}`} key={i} className='flex flex-col gap-2'>
        <Image src={item.imageUrl} alt='' width={80} height={80} className='w-full h-36 rounded-lg'/>
        <p>{item.name}</p>
        <p>{item.songs.length} Songs</p>
       </Link>))}
    </div>
   </>
  )
}

export default RecentAlbums
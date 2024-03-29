import React, { Key } from 'react';
import { RiPlayListAddLine } from "react-icons/ri";

import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FaHome,
  FaSearch,
  FaSpotify,
  FaUser,
} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { LuLibrary } from 'react-icons/lu';
import { MdWorkspacePremium } from 'react-icons/md';
import { PiMusicNotesPlus } from 'react-icons/pi';
import { useDispatch } from 'react-redux';

import { songModalActions } from '@/contexts/SongModalContext';
import useCurrentUser from '@/hooks/useCurrentUser';

type Props = {
  isSwipedLeft?: boolean,
  isSwipedRight?: boolean,
  onSwitchOff: ()=> void
}

interface LinkObject{
  path: String,
  icon: IconType,
  title?: String,
  key: Key,
}

function LeftBar({isSwipedLeft, isSwipedRight, onSwitchOff}: Props) {
  const { data: user } = useCurrentUser();
  const router = useRouter();
  
  const linksArray: LinkObject[] = [
    {
    path: '/',
    icon: FaHome,
    title: 'Home',
    key: 'Home'
    },
    {
    path: '/search',
    icon: FaSearch,
    title: 'Search',
    key: 'Search'
  },
    {
      path: `/profile`,
      icon: FaUser,
      title: 'Profile',
      key: 'Profile'
    }, {
      path: '/library',
      icon: LuLibrary,
      title: 'Library',
      key:'Library'
},
  {
    path: '/premium',
    icon: MdWorkspacePremium,
    title: 'Premium',
    key: 'Premium'
}
  ]

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(songModalActions.showModal());
  }


  return (<>
    <div className={`bg-spotifyOpacityDarkGray rounded-t-md border-spotifyGreen border-r h-screen col-span-1 sm:hidden lg:flex flex-col gap-3`}>
      <div className="flex flex-col my-2 gap-2 items-center justify-center">
       <FaSpotify className='text-white hover:text-spotifyOpacityGreen transition cursor-pointer hover:rotate-90' size={36}/>
        <p className="tracking-wide text-base text-white">Spotify</p>
      </div>
      <div className="flex items-center flex-col gap-4 sm:p-4 lg:p-2">
        {linksArray.map((link, i) => (
          <Link href={`${link.path}`} key={i} className={`flex ${link.path === router.asPath ? 'bg-spotifyGreen' : ''} transition p-3 2xl:w-full sm:justify-center 2xl:justify-start rounded-full hover:bg-spotifyOpacityGreen gap-4 items-center `}>
            <link.icon size={24} />
            <p className='2xl:block sm:hidden text-base font-light'>{link.title}</p>
          
          </Link>
        ))}
        {user?.isArtist && 
           <>
            <button onClick={handleOpenModal}  className='flex transition p-3 2xl:w-full sm:justify-center 2xl:justify-start rounded-full hover:bg-spotifyOpacityGreen gap-4 items-center '>
            <PiMusicNotesPlus size={24} />
            <p className='2xl:block sm:hidden text-base font-light'>Song</p>
          </button>
           </>
        }
      </div>
      </div>


    <div className={`sm:flex transition-all duration-500 flex-col delay-100 lg:hidden bg-spotifyDarkGray gap-4 min-h-screen absolute top-0 z-[100] min-w-64 max-w-80 ${isSwipedLeft ? 'left-0' : '-left-full'}`}>
       <div className="flex flex-col my-2 gap-2 items-center justify-center">
       <FaSpotify className='text-spotifyOpacityGreen transition cursor-pointer hover:rotate-90' size={36}/>
        <p className="tracking-wide text-base text-white">Spotify</p>
      </div>

    <div className="flex flex-col gap-4 sm:p-4 lg:p-2">
        {linksArray.map((link, i) => (
          <button onClick={onSwitchOff} key={i} className={`flex justify-around transition py-2 px-1 lg:w-full rounded-full hover:bg-spotifyOpacityGreen gap-4 items-center ${link.path === router.asPath ? 'bg-spotifyGreen' : ''}`}>
            <link.icon size={24} />
            <p className='text-base font-light'>{link.title}</p>
          </button>
        ))}
        
        {user?.isArtist && 
        <>
        <button onClick={() => {
          handleOpenModal();
          onSwitchOff();
        }} className='flex justify-around transition py-2 px-1 lg:w-full rounded-full hover:bg-spotifyOpacityGreen gap-4 items-center '>
        <PiMusicNotesPlus size={24} />
            <p className='text-base font-light'>Song</p>
          </button>
        <button className='flex justify-around transition py-2 px-1 lg:w-full rounded-full hover:bg-spotifyOpacityGreen gap-4 items-center'>
       <RiPlayListAddLine/> 
       <p className='text-base font-light'>Playlist</p>
        </button>
        </>
        }
      </div>
  </div>
    
  </>
  )
}

export default LeftBar
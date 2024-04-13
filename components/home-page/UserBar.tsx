import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { CgFolderAdd } from 'react-icons/cg';
import { FaBell } from 'react-icons/fa6';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { RiPlayListAddFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import Profile from '@/assets/frame_20_delay-0.1s.jpg';
import { albumModalActions } from '@/contexts/AlbumModalContext';
import { playlistModalActions } from '@/contexts/PlayListModalContext';
import useCurrentUser from '@/hooks/useCurrentUser';

type Props = {
  onPressProfile:()=>void
}

function UserBar({onPressProfile }: Props) {
  const [scrolledToPoint, setScrolledToPoint] = useState(false);
const router=useRouter();
  const { data:user } = useCurrentUser();
const moveBack=()=>{
  router.back()
}
const dispatch=useDispatch();


const openPlaylistModal=()=>{
  dispatch(playlistModalActions.showModal());
}

const openAlbumModal=()=>{
  dispatch(albumModalActions.showModal());
}

useEffect(()=>{

  console.log(window.screenY);
  const onScroll = () => setScrolledToPoint(window.scrollY > 40);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
},[])

  return (
    <div className={`flex transition sticky top-0 left-0 z-50 justify-between p-3 bg-spotifyDarkGray`}>
     <div className="flex gap-6">
      <button onClick={moveBack}>
        <MdKeyboardArrowLeft className=' text-spotifyLightGray' size={24} />
      </button>
      {user && user.isArtist &&
     <button onClick={openAlbumModal}><CgFolderAdd className='text-spotifyLightGray' size={20}/></button>
      }
<button onClick={openPlaylistModal}><RiPlayListAddFill className=' text-spotifyLightGray' size={20}/></button>
     {router.asPath === '/search' && <label className="input sm:hidden lg:flex input-bordered rounded-full items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
  <input onChange={(e:ChangeEvent<HTMLInputElement>)=>console.log(e.target.value)} type="text" className="grow" placeholder="Search" />
</label>}
     
     </div>
      
      <div className="flex gap-6">
        <button onClick={async () => {
          console.log(user);

        }}  className="bg-white px-4 sm:hidden md:block rounded-full py-1">
      <p className='text-sm text-black font-bold'>
        Explore Premium
      </p>
        </button>
        <button>
          <FaBell className=" text-spotifyLightGray"/>
        </button>
        {user && 
        
        <button onClick={onPressProfile}>
          <Image width={32} height={32} src={user.profileImg ? user.profileImg : Profile} alt='Profile' className='rounded-full w-8 h-8 object-cover'/> 
        </button>
        }
      </div>
    </div>
  )
}

export default UserBar
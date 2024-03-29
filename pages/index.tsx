import { useEffect } from 'react';

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import InitalTabs from '@/components/home-page/InitalTabs';
import MusicGenres from '@/components/home-page/playlists/MusicGenres';
import RecentlyAdded from '@/components/home-page/playlists/RecentlyAdded';

export default function Home(props) {
const router = useRouter();
  const showRight = useSelector((state: any) => state.playmusic.showRightBar);
  useEffect(() => {
    getSession().then((result) => {
      if (!result) {
        router.push('/enter');
      } else {
        return;
      }
    })
  }, [router]);
  

  return (
    <div className='flex min-h-screen flex-col gap-4'>
      
      <div className="flex gap-2 mt-4 ml-4">
        <button className="rounded-full font-medium text-sm bg-white text-spotifyBlack px-4 py-2">
          Everything
        </button>
        <button className="rounded-full text-sm bg-spotifyDarkGray text-white px-6 py-1">
          Music
        </button>
        <button className="rounded-full text-sm bg-spotifyDarkGray text-white px-5 py-1">
          Podcasts
        </button>
      </div>
      
      <InitalTabs />

 <MusicGenres closedRight={showRight} />
      <RecentlyAdded closedRight={showRight} />
    </div>
  );
}




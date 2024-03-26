import { useEffect } from 'react';

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import InitalTabs from '@/components/home-page/InitalTabs';
import MusicGenres from '@/components/home-page/playlists/MusicGenres';
import RecentlyAdded from '@/components/home-page/playlists/RecentlyAdded';

export default function Home() {
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
      <InitalTabs />

 <MusicGenres closedRight={showRight} />
      <RecentlyAdded closedRight={showRight} />
    </div>
  );
}




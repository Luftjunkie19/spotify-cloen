import { useEffect } from 'react';

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import InitalTabs from '@/components/home-page/InitalTabs';
import MusicGenres from '@/components/home-page/playlists/MusicGenres';
import RecentlyAdded from '@/components/home-page/playlists/RecentlyAdded';

export default function Home() {
const router = useRouter();

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
    <div className='flex flex-col gap-6'>
      <InitalTabs />

 <MusicGenres closedRight={true} />
      <RecentlyAdded closedRight={true} />
    </div>
  );
}


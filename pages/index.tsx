import { Inter } from 'next/font/google';

import InitalTabs from '@/components/home-page/InitalTabs';
import MusicGenres from '@/components/home-page/playlists/MusicGenres';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  

  return (
    <div className='flex flex-col gap-6'>
      <InitalTabs/>
 <MusicGenres />
    </div>
  );
}

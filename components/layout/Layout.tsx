import React, {
  useEffect,
  useState,
} from 'react';

import {
  getSession,
  signOut,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import LeftBar from '@/components/LeftBar';
import RightBar from '@/components/RightBar';
import { playMusicActions } from '@/contexts/PlayMusicContext';
import classes from '@/styles/gridcolumns.module.css';

import BottomPlayBar from '../BottomPlayBar';
import UserBar from '../home-page/UserBar';
import AddAlbumModal from '../modals/AddAlbumModal';
import AddPlaylistModal from '../modals/AddPlaylistModal';
import AddSongModal from '../modals/AddSongModal';

type Props = {
    children: React.ReactNode
}

function Layout({ children }: Props) {
  const router = useRouter();
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);
  const showRight = useSelector((state: any) => state.playmusic.showRightBar);
  const disaptch = useDispatch();

  const toggleRight = () => {
    disaptch(playMusicActions.toggleRightBar());
  }

  const onTouchMove = (e: React.TouchEvent) => {
    console.log(e.targetTouches[0]);
  }
  const onSwitchOff = () => setIsSwipedLeft(false);
  const onPressProfileImage = async () => {
   await signOut();
  };

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        router.replace('/enter');
      } else {
        setSessionLoaded(true);
      }
    })
  },[router])

  const UnsessionedLayout = <div className='w-full min-h-screen overflow-auto'>
    {children}
    </div>;

  const SessionedLayout = (<><div onTouchMove={onTouchMove} className={`flex h-full w-full`}>

    <LeftBar onSwitchOff={onSwitchOff} isSwipedLeft={isSwipedLeft} />

    <div onClick={onSwitchOff} className={` flex-1 overflow-y-auto overflow-x-hidden min-h-screen`}>
      <UserBar onPressProfile={onPressProfileImage} />
      {children}
    </div>

    <RightBar />
  </div><BottomPlayBar toggleRight={toggleRight} rightClosed={showRight} /></>);

  return (
    <div className='h-screen w-screen' >
    {sessionLoaded ? SessionedLayout  : UnsessionedLayout}
      <AddPlaylistModal/>
      <AddSongModal />
      <AddAlbumModal/>
    </div>
  )
}

export default Layout

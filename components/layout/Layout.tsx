import React, {
  useEffect,
  useRef,
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
  const [startX, setStartX] = useState(0);
  const showRight = useSelector((state: any) => state.playmusic.showRightBar);
  const disaptch = useDispatch();
  const containerRef=useRef<HTMLDivElement | null>(null);

  const toggleRight = () => {
    disaptch(playMusicActions.toggleRightBar());
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setStartX(e.targetTouches[0].pageX);
  }

const onTouchMove = (e: React.TouchEvent) => {
  // Check if the touch event target is the main container
  console.log(containerRef.current);
  if (containerRef.current) {
    const  currentPageX = e.targetTouches[0].pageX - startX;
    if (currentPageX >= 250) {
      setIsSwipedLeft(true);
    } else {
setIsSwipedLeft(false);
    }
  }
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

  const SessionedLayout = (<><div ref={containerRef}  className={`flex h-full w-full`}>

    <LeftBar onSwitchOff={onSwitchOff} isSwipedLeft={isSwipedLeft} />

    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onClick={onSwitchOff} className={` flex-1 overflow-y-auto overflow-x-hidden min-h-screen`}>
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

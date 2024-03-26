import React, {
  useEffect,
  useState,
} from 'react';

import { getSession } from 'next-auth/react';
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
  const onPressProfileImage = () => {
    setIsSwipedLeft(true)
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

  const UnsessionedLayout = <>
    {children}</>;

  const SessionedLayout = (<><div onTouchMove={onTouchMove} className={`lg:grid h-full w-full ${!showRight ? `grid-cols-10` : `${classes["gridcolumns-desktop"]}`}`}>

    <LeftBar onSwitchOff={onSwitchOff} isSwipedLeft={isSwipedLeft} />

    <div onClick={onSwitchOff} className={`${!showRight ? 'col-span-9' : 'xl:col-span-8 lg:col-span-7'}`}>
      <UserBar onPressProfile={onPressProfileImage} />
      {children}
    </div>

    <RightBar />
  </div><BottomPlayBar toggleRight={toggleRight} rightClosed={showRight} /></>);

  return (
    <div className='h-screen w-screen' >
      <AddSongModal />
    {sessionLoaded ? SessionedLayout  : UnsessionedLayout}
    </div>
  )
}

export default Layout

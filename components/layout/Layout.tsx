import React, { useState } from 'react';

import LeftBar from '@/components/LeftBar';
import RightBar from '@/components/RightBar';
import classes from '@/styles/gridcolumns.module.css';

import BottomPlayBar from '../BottomPlayBar';
import UserBar from '../home-page/UserBar';

type Props = {
    children: React.ReactNode
}

function Layout({ children }: Props) {
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);

  const onTouchMove = (e: React.TouchEvent) => setIsSwipedLeft(e.targetTouches[0].clientX > 300);
  const onSwitchOff = () => setIsSwipedLeft(false);
  const onPressProfileImage=()=>{
     setIsSwipedLeft(true)
  }
  return (
<div className='h-screen w-screen' >
      <div className={`lg:grid h-full w-full ${classes["gridcolumns-desktop"]}`}>      
      
        <LeftBar onSwitchOff={onSwitchOff} isSwipedLeft={isSwipedLeft} />
    
          <div onClick={onSwitchOff} onTouchMove={onTouchMove} className={`xl:col-span-8 lg:col-span-7`}>
            <UserBar onPressProfile={onPressProfileImage}/>    
          {children}
        </div>
     
          <RightBar />
      </div>
      <BottomPlayBar />
    </div>
  )
}

export default Layout

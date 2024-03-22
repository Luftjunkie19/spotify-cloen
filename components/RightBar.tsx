import React from 'react';

import coverImage from '@/assets/79e6eef3-3268-4d46-9435-19f3ab6fcd50.webp';

import Cover from './layout/right-bar/Cover';
import NextSong from './layout/right-bar/NextSong';

type Props = {}

function RightBar({}: Props) {
  return (
    <div className='border-l-spotifyMediumGray sm:hidden lg:block lg:col-span-4 xl:col-span-3 border-l p-4 w-full h-full'>

      <Cover title='Es Tut Mir Leid' artists={["Capital Bra"]} imageURL={coverImage} />  

      <NextSong title={'BMW Alpina'} cover={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s'} artists={['Capital Bra']}/>
    </div>
  )
}

export default RightBar
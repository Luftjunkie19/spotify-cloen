import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

type Props = {}

function InitalTabs({}: Props) {
  return (
      <div className='grid sm:grid-cols-2 2xl:grid-cols-4 gap-2 p-4'>
          <Link href='/library' className="flex max-w-xs duration-500 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:bg-spotifyMediumGray gap-6 rounded-lg bg-spotifyDarkGray cursor-pointer">
              <Image  className='rounded-l-lg object-cover w-14 h-full' width={56} height={60} src={'https://i.pinimg.com/474x/e5/4f/19/e54f19d0ea4c93db35885d386d9b9677.jpg'} alt='width'/>
            <p className='sm:text-xs font-bold lg:text-base self-center py-4'>
              Liked songs
              </p>  
          </Link>

      
    </div>
  )
}

export default InitalTabs
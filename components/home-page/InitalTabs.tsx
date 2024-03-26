import React from 'react';

import Image from 'next/image';

type Props = {}

function InitalTabs({}: Props) {
  return (
      <div className='grid sm:grid-cols-2 2xl:grid-cols-4 gap-2 p-4'>
          <div className="flex duration-500 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:bg-spotifyMediumGray gap-6 rounded-lg bg-spotifyDarkGray cursor-pointer">
              <Image width={56} height={56}  className='rounded-l-lg object-cover w-14 h-14' src={'https://www.patriotledger.com/gcdn/authoring/2008/10/25/NPAL/ghows-WL-0d6e51dc-03d3-4960-994f-479720d35ee1-e8dc693f.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp'} alt='width'/>
            <p className='sm:text-xs lg:text-base self-center py-4'>
              Div 1
              </p>  
          </div>

          <div className="flex duration-500 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:bg-spotifyMediumGray gap-6 rounded-lg bg-spotifyDarkGray cursor-pointer">
               <Image width={56} height={56}  className='rounded-l-lg object-cover max-w-14 max-h-14' src={'https://assets.capitalxtra.com/2020/20/roddy-ricch-1590070664-view-0.jpg'} alt='width'/>

            <p className='sm:text-xs lg:text-base self-center py-4'>
              Div 2
              </p>      
          </div>

          <div className="flex duration-500 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:bg-spotifyMediumGray gap-6 rounded-lg bg-spotifyDarkGray cursor-pointer">
              <Image width={56} height={56}  className='rounded-l-lg  object-cover max-w-14 max-h-14' src={'https://assets.capitalxtra.com/2020/20/roddy-ricch-1590070664-view-0.jpg'} alt='width'/>
            <p className='sm:text-xs lg:text-base self-center py-4'>
              Div 3
              </p>   
          
          </div>

          <div className="flex duration-500 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:bg-spotifyMediumGray gap-6 rounded-lg bg-spotifyDarkGray cursor-pointer">
              <Image width={56} height={56}  className='rounded-l-lg object-cover max-w-14 max-h-14' src={'https://assets.capitalxtra.com/2020/20/roddy-ricch-1590070664-view-0.jpg'} alt='width'/>
            <p className='sm:text-xs lg:text-base self-center py-4'>
              Div 4
              </p>    
          </div>

          <div className="flex duration-500 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:bg-spotifyMediumGray gap-6 rounded-lg bg-spotifyDarkGray cursor-pointer">
              <Image width={56} height={56}  className='rounded-l-lg  object-cover max-w-14 max-h-14' src={'https://assets.capitalxtra.com/2020/20/roddy-ricch-1590070664-view-0.jpg'} alt='width'/>
                <p className='sm:text-xs lg:text-base self-center py-4'>
              Div 5
              </p>  
          </div>
          
          <div className="flex duration-500 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:bg-spotifyMediumGray gap-6 rounded-lg bg-spotifyDarkGray cursor-pointer">
              <Image width={56} height={56}  className='rounded-l-lg  object-cover max-w-14 max-h-14' src={'https://assets.capitalxtra.com/2020/20/roddy-ricch-1590070664-view-0.jpg'} alt='width'/>

              <p className='sm:text-xs lg:text-base self-center py-4'>
              Div 6
              </p>              
              
              
          </div>
          
          <div className="flex duration-500 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:bg-spotifyMediumGray gap-6 rounded-lg bg-spotifyDarkGray cursor-pointer">
              <Image width={56} height={56}  className='rounded-l-lg object-cover max-w-14 max-h-14' src={'https://assets.capitalxtra.com/2020/20/roddy-ricch-1590070664-view-0.jpg'} alt='width'/>
              <p className='sm:text-xs lg:text-base self-center py-4'>    
              Div 7
          </p>
          </div>

          <div className="flex duration-500 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:bg-spotifyMediumGray gap-6 rounded-lg bg-spotifyDarkGray cursor-pointer">
              <Image width={56} height={56}  className='rounded-l-lg  object-cover max-w-14 max-h-14' src={'https://assets.capitalxtra.com/2020/20/roddy-ricch-1590070664-view-0.jpg'} alt='width'/>
              <p className='sm:text-xs lg:text-base self-center py-4'>
                  
              Div 8
        </p>
              
              </div>
    </div>
  )
}

export default InitalTabs
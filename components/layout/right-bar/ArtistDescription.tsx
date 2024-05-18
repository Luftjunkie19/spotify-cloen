import Image from 'next/image'
import React from 'react'

type Props = {
    artistName:string,
    artistDescription:string,
    artistImage:string,
}

function ArtistDescription({artistImage, artistName, artistDescription}: Props) {
  return (
    <div className=' bg-spotifyDarkGray flex-col flex gap-2'>
<p>About the Artist</p>
<Image alt='' src={artistImage} width={256} height={64} className='w-full h-16'/>
<div className="flex flex-col gap-4 p-2">
    <p className='text-xl font-bold'>{artistName}</p>
</div>
<p>{artistDescription}</p>
    </div>
  )
}

export default ArtistDescription
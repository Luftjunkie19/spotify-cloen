import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    imageUrl:string,
    id:string, 
    name:string,
    songsLength: number

}

function AlbumItem({imageUrl, id, songsLength, name}: Props) {
  return (
    <Link href={`/album/${id}`} className='flex flex-col gap-2'>
    { imageUrl &&  <Image src={imageUrl} alt='' width={80} height={80} className='w-full h-36 rounded-lg'/>}
            <p>{name}</p>
            <p>{songsLength} Songs</p>
           </Link>
  )
}

export default AlbumItem
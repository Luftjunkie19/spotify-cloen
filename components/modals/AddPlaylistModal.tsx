import React from 'react';

import Modal from './Modal';

type Props = {}

function AddPlaylistModal({}: Props) {
  return (
      <Modal body={<div className={`w-screen ${2 - 1 === 0 ? '' : 'hidden'} flex flex-col justify-center items-center h-screen fixed z-[100] top-0 left-0 bg-spotifyOpacityDarkGray`}>
          <div className="">
              
          </div>

      </div>} />
  )
}

export default AddPlaylistModal
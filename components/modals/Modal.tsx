import React from 'react';

type Props = {
    body: React.ReactNode,

}

function Modal({body}: Props) {
  return (
      <div className='z-50'>
          {body}
    </div>
  )
}

export default Modal
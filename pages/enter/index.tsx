import React from 'react';

import Modal from '@/components/modals/Modal';

type Props = {}

function EnterPage({}: Props) {
  return (
      <div className='w-full h-screen flex justify-center items-center'>
          <Modal body={(<div className=' p-8 min-w-96 min-h-96 rounded-xl bg-spotifyMediumGray flex flex-col justify-around gap-4'>
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username:</label>
          <input className='input' type="text" name='username' id='username' required />
        </div>

        <div className="flex flex-col gap-2">
    <label htmlFor="password">Password:</label>
  <div className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input type="password" className="grow" value="password" />
</div>  
        </div>      
        
        <button className="btn bg-spotifyGreen border border-spotifyDarkGray hover:border-spotifyGreen text-lg font-light hover:bg-spotifyBlack hover:text-spotifyGreen text-spotifyBlack">Sign Up</button>

          </div>)} />
    </div>
  )
}

export default EnterPage
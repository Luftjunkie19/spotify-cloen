import React from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import classes from '@/styles/subscription.module.css';

type Props = {}

function PremiumPage() {
  const { data: userData } = useCurrentUser();
  const handleSubscribeClick = async (selectedPlanPrice: string) => { 
    const fetchedData = await fetch('/api/stripe/subscription', {
      method: "POST",
      body: JSON.stringify({ selectedPlanPrice, userId: userData.id}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const sessionURL = await fetchedData.json();

    window.location.href = sessionURL;
  };


  return (
      <div className='w-full h-screen bg-spotifyBlack overflow-scroll '>
          <div className={`w-full flex flex-col gap-2 h-72 items-center justify-center ${classes["hero-bg"]} p-2`}>
              <p className="text-3xl font-semibold text-center">Get Your Individual Premium account !</p>
              <p className="text-center">With Premium account you will be able to listen to your favourite music and enjoy it limitlessly and without any ads !</p>
              <div className="flex justify-center p-2 self-center gap-4 my-4 flex-wrap" >
                  <button className='btn cursor-pointer hover:scale-105 transition-all hover:bg-white z-[100] rounded-full bg-white text-spotifyBlack font-inherit'>Get Premium Individual</button>
                  <button className="btn z-[100] hover:bg-transparent hover:border-white hover:scale-105 transition-all rounded-full bg-transparent text-white border-2 border-white">View all plans</button>
          </div>
          
          </div>

          <div className="flex flex-col gap-1 justify-center items-center my-2">

          <p className="text-center font-medium text-2xl py-2">Affordable premium accounts for everybody</p>
          <p className="text-center text-lg max-w-3xl">Choose an premium option, that fits to your budget and needs, purchase and  enjoy the music you love without any interuptions.</p>
          </div>

          <div className="p-20 rounded-lg border-spotifyLightGray border-4 max-w-5xl mx-auto my-4 flex justify-center items-center flex-col gap-3">
              <p className="font-medium text-3xl">All Premium Plans Include</p>
              <ul className=' list-disc'>
                <li>Add free music access</li>
                <li>Download to listen offline</li>
                <li>Play songs in any order</li>
                <li>High audio quality</li>
                <li>Listen with friends in real time</li>
                <li>Organise listening queue</li>
                
              </ul>
          </div>

          <div className="flex flex-wrap bg-spotifyBlack items-center justify-center gap-6 max-w-6xl mx-auto p-8">
              <div className="card max-w-xs h-64 w-full bg-spotifyGreen border-2 border-spotifyLightGray text-primary-content">
  <div className="card-body gap-1 px-6 py-8">
                      <div className="flex justify-between gap-6">
                          <p className=" text-lg font-medium">Premium Individual</p>

                          <div className="">
                              <p className="font-medium">$5.99</p>
                              <p className=' text-xs'>Per Month</p>
                          </div>
    </div>

    <ul className='list-disc px-3'>
    <li className="font-light">1 Premium Account</li>
    <li className="font-light">Cancel Anytime</li>                      
    </ul>     

    <div className="card-actions justify-center mt-3">
              <button onClick={async () => {
                await handleSubscribeClick('price_1OyIIaAqg1VPDrTFRv7OZyl2');
      }} className="btn w-full font-inherit font-bold bg-spotifyDarkGray text-white">Buy Now</button>
    </div>
  </div>
</div>

            <div className="card max-w-xs w-full h-64 bg-spotifyGreen border-2 border-spotifyLightGray text-primary-content">
  <div className="card-body gap-1 px-6 py-8">
                      <div className="flex justify-between gap-6">
                          <p className=" text-lg font-medium">Premium Duo</p>

                          <div className="">
                              <p className="font-medium">$9.99</p>
                              <p className=' text-xs'>Per Month</p>
                          </div>
    </div>

    <ul className='list-disc px-3'>
    <li className="font-light">2 Premium Accounts</li>
    <li className="font-light">Cancel Anytime</li>                      
    </ul>     

    <div className="card-actions justify-center mt-3">
      <button onClick={async () => {
                await handleSubscribeClick('price_1OyIJXAqg1VPDrTFZbagtwND');
      }} className="btn w-full font-inherit font-bold bg-spotifyDarkGray text-white">Buy Now</button>
    </div>
  </div>
              </div>
              
                          <div className="card max-w-xs max-h-64 h-full w-full bg-spotifyGreen border-2 border-spotifyLightGray text-primary-content">
  <div className="card-body gap-1 px-6 py-8">
                      <div className="flex justify-between gap-6">
                          <p className=" text-lg font-medium">Premium Family</p>

                          <div className="">
                              <p className="font-medium">$12.99</p>
                              <p className=' text-xs'>Per Month</p>
                          </div>
    </div>

    <ul className='list-disc px-3'>
                          <li className="font-light">Up to 6 Premium Accounts</li>
                          <li className="font-light">Control content marked as explicit</li>
    <li className="font-light">Cancel Anytime</li>                      
    </ul>     

    <div className="card-actions justify-center mt-3">
      <button onClick={async () => {
                await handleSubscribeClick('price_1OyIL3Aqg1VPDrTFK124iLJx');
      }} className="btn w-full font-inherit font-bold bg-spotifyDarkGray text-white">Buy Now</button>
    </div>
  </div>
</div>

          </div>

    </div>
  )
}

export default PremiumPage
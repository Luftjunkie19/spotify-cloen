import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import Stripe from 'stripe';
import prisma from '@/util/prismadb';
import { buffer } from 'micro';


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const webhookSecret = 'whsec_2263028466f1ca7f6f96976a4869f5251cb80f73a332daa799b09f390f96f53c';

export const config= {
  api:{
    bodyparser:false,
  },
};

async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
  }

  try {
    const rawBody = await buffer(req);
    const sig = req.headers['stripe-signature'];
  

    console.log(rawBody);

    let event: Stripe.Event;

      try {
          event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
          console.log('Stripe Event:', event);
      } catch (err) {
          console.error('Error constructing event:', err);
          return res.status(400).send(`Webhook Error: ${err}`);
      }

      try {
        if(event.type === "checkout.session.completed"){
          const userId=event.data.object.metadata?.userId;

          console.log(userId);
  
          if(userId){
            await prisma.user.update({where:{
              id:userId as string,
            }, data:{
              isSubscribed:true
            }});
            return res.status(201).json('Successfully subscribed to Clonify.');
          }else{
            return res.status(403).json('Unsuccessfully subscribed to Clonify.');
          }
        }
  
        if(event.type === "customer.subscription.created"){
          console.log(event.data.object);
        }
  
        if(event.type === 'subscription_schedule.expiring'){
  
        }
  
        if(event.type === 'customer.subscription.trial_will_end'){}
        
      } catch (error) {
       console.log(error);
       return res.status(403).json(error); 
      }
  } catch (error) {
      console.error('Error processing webhook:', error);
      return res.status(500).send('Internal Server Error');
  }
}

export default POST;

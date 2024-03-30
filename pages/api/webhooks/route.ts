import { buffer } from 'node:stream/consumers';

import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import Stripe from 'stripe';

import prisma from '@/util/prismadb';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



const webhookSecret = 'whsec_2263028466f1ca7f6f96976a4869f5251cb80f73a332daa799b09f390f96f53c';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
  }


    const rawBody = await buffer(req);
    const sig = req.headers['stripe-signature'];


    let event: Stripe.Event;

      try {
          event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
      } catch (err) {
          console.error('Error constructing event:', err);
          return res.status(400).send(`Webhook Error: ${err}`);
      }

  try {
    if(event.type === "customer.subscription.created"){
       console.log('Subscription Creation completed');
       console.log(event.data.object.id);
          await prisma.subcriber.create({
         data: {
           startedSubscription: event.data.object.current_period_start as number,
           isGoingToExpire: event.data.object.current_period_end as number,
           currency: event.data.object.currency as string,
              subscriptionId: event.data.object.id as string,
         }
       });
       
  
       console.log('Subscription Creation completed');
     }
  
  
  if (event.type === "invoice.paid") {
  console.log('Paid Invoice Creation completed');
  if (!event.data.object.subscription) {
   console.log('No subscription !');
  } else {
   await prisma.subcriber.update({
     where: { subscriptionId: event.data.object.subscription as string },
     data: {
       amount: event.data.object.amount_paid,
       currency: event.data.object.currency,
       invoice: event.data.object.hosted_invoice_url,
     }
   });
         console.log('Paid Invoice Creation completed');
  }
     }
  
  
     if(event.type === "checkout.session.completed"){
       const userId = event.data.object.metadata?.userId;
       console.log('Checkout completed');
       console.log(event.data.object);
       console.log('Checkout completed');
       console.log(userId);
  
       const session = await stripe.checkout.sessions.retrieve(event.data.object.id);
  
       const subscriberObject = await prisma.user.findUnique({
         where: {
           id: userId
         }, select: {
           id: true,
           username: true,
         }
       });
  
       await stripe.subscriptions.update(
         session.subscription,
         { metadata: subscriberObject }
       );
  
  
  
       console.log("Session retrieved");
       console.log(session);
       console.log("Session retrieved");
  
       if(userId){
  
         await prisma.subcriber.update({
           where: { subscriptionId: session.subscription as string }, data: {
             subscriberId: userId,
           }
         });
  
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
  
  
     if(event.type === 'subscription_schedule.expiring'){
    console.log(event.data.object);
     }
  
     if (event.type === 'customer.subscription.trial_will_end') {
            console.log(event.data.object);
     }
     
    return res.status(201).json('Success'); 
  } catch (error) {
    return res.status(500).send(`Error processing webhook: ${error}`);
  }
  
  
}

export default handler ;

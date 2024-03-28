import Cors from 'micro-cors';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import getRawBody from 'raw-body';
import Stripe from 'stripe';

import prisma from '@/util/prismadb';

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

export const config = {
  api: {
    bodyParser: false
  }
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

let webhookSecret = 'whsec_2263028466f1ca7f6f96976a4869f5251cb80f73a332daa799b09f390f96f53c';

 async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const rawBody = await getRawBody(req);
        const sig = req.headers['stripe-signature']!
      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
      } catch (err) {
            // On error, log and return the error message
            console.log(`❌ Error message: ${err}`)
            res.status(400).send(`Webhook Error: ${err}`)
            return
          }
      
          try { 

        if (event.type === 'checkout.session.completed') {
         let subscriberId = event.data.object.metadata?.id as string;

          await prisma.user.update({
            where: { id: subscriberId }, data: {
            isSubscribed:true,
          }})

          return res.status(201).json(event.data.object);
        }


          if (event.type === 'customer.subscription.created') { 
          console.log("New subscription created");
          console.log(event.data.object);
          console.log("New subscription created");
          
            
       return res.status(201).json(event);
      }
      
      if (event.type === 'customer.subscription.trial_will_end') {
        return res.status(201).json(event);
      }
      }
      catch (err) {
        return res.status(403).json(err);
}

    

    }
}
export default cors(POST as any);
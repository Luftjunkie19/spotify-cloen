import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {

        const {selectedPlanPrice, subscriberId} = req.body;
        console.log(selectedPlanPrice);

const session = await stripe.checkout.sessions.create({
  success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
  line_items: [{
    price: selectedPlanPrice,
    quantity: 1,
  }],
  metadata:{
    userId:subscriberId,
  },
  mode: 'subscription',
})

       return res.status(201).json(session);
    }
    catch(err){
        console.log(err);
       return res.status(403).json(err);
    }
}

export default handler
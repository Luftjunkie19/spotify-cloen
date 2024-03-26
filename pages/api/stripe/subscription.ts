import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {

        const {selectedPlanPrice} = req.body;
        console.log(selectedPlanPrice);

const session = await stripe.checkout.sessions.create({
  success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  line_items: [{
    price: selectedPlanPrice,
    quantity: 1,
  }],
  mode: 'subscription',
})

       return res.status(201).json(session.url);
    }
    catch(err){
        console.log(err);
        res.status(403).json(err);
    }
}

export default handler
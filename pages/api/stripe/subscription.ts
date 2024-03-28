import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        const {selectedPlanPrice, userId} = req.body;
        console.log(selectedPlanPrice);
      
      const session = await stripe.checkout.sessions.create({
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        payment_method_configuration: 'pmc_1OyzoDAqg1VPDrTFI1E0KqKe',
        line_items: [{
          price: selectedPlanPrice,
          quantity: 1,
        }],
        mode: 'subscription',
        metadata: {
          id: userId,
        }
      });

       return res.status(201).json(session.url);
    }
    catch(err){
        console.log(err);
        res.status(403).json(err);
    }
}

export default handler
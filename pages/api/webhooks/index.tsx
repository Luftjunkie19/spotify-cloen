import Cors from 'micro-cors';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { buffer } from 'stream/consumers';
import Stripe from 'stripe';

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const webhookSecret = 'STRIPE_SECRET_KEY';

const POST = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const buf = await buffer(req)
        const sig = req.headers['stripe-signature']!
        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);

            console.log(event);
            
        } catch (err) {
            // On error, log and return the error message
            console.log(`❌ Error message: ${err}`)
            res.status(400).send(`Webhook Error: ${err}`)
            return
        }

        console.log(event);

    }
}
export default cors(POST as any);
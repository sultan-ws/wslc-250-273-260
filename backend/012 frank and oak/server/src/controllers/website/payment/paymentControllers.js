const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const toPay = async (req, res)=>{
    console.log(req.body)
    try{
        const lineItems = req.body.data.map((item)=> (
            {
                price_data:{
                    currency: 'inr',
                    product_data:{
                        name: item.product.name
                    },
                    unit_amount: item.product.price * 100
                },
                quantity: item.quentity
            }
        ));

        const customer = await stripe.customers.create({
            name: 'Raghav',
            address:{
                line1: 'd-215',
                line2: 'shashtri nagar',
                city: 'Mumbai',
                state: 'Maharashtra',
                postal_code: '400001',
                country: 'in'
            }
        });

        

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/payment-successfull',
            cancel_url: 'http://localhost:3000/payment-failed',
            customer: customer.id
        });

        console.log(customer, session);

        res.status(200).json({message:'success', seesion_id: session.id})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    toPay
}
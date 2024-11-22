const midtransClient = require('midtrans-client');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { price, type } = req.body;

            const snap = new midtransClient.Snap({
                isProduction: false, // Gunakan false untuk sandbox
                serverKey: process.env.MIDTRANS_SERVER_KEY,  // Ambil dari environment variables
                clientKey: process.env.MIDTRANS_CLIENT_KEY   // Ambil dari environment variables
            });

            const parameter = {
                transaction_details: {
                    order_id: 'order-id-' + new Date().getTime(),
                    gross_amount: parseInt(price.replace('Rp', '').replace('.', '').trim())
                },
                credit_card: {
                    secure: true
                },
                item_details: [
                    {
                        id: 'item-1',
                        name: type,
                        price: parseInt(price.replace('Rp', '').replace('.', '').trim()),
                        quantity: 1
                    }
                ]
            };

            const transaction = await snap.createTransaction(parameter);
            res.status(200).json({ redirect_url: transaction.redirect_url });
        } catch (error) {
            console.error('Error creating payment:', error);
            res.status(500).send('Payment creation failed');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}

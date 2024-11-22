const midtransClient = require('midtrans-client');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { price, type } = req.body;

            // Konfigurasi Midtrans menggunakan kunci langsung
            const snap = new midtransClient.Snap({
                isProduction: false,  // Gunakan false untuk sandbox
                serverKey: 'SB-Mid-server-wkTyIguA0OaTZ_DeSy13Iyrm',  // Ganti dengan Server Key Anda
                clientKey: 'SB-Mid-client--jucMGGRSNhaA_C1'   // Ganti dengan Client Key Anda
            });

            const parameter = {
                transaction_details: {
                    order_id: 'order-id-' + new Date().getTime(),
                    gross_amount: parseInt(price.replace('Rp', '').replace('.', '').replace(',', '').trim())  // Pastikan harga diproses dengan benar
                },
                credit_card: {
                    secure: true
                },
                item_details: [
                    {
                        id: 'item-1',
                        name: type,
                        price: parseInt(price.replace('Rp', '').replace('.', '').replace(',', '').trim()),
                        quantity: 1
                    }
                ]
            };

            const transaction = await snap.createTransaction(parameter);
            res.status(200).json({ redirect_url: transaction.redirect_url });
        } catch (error) {
            console.error('Error creating payment:', error);
            res.status(500).json({ error: error.message });  // Kirimkan pesan error yang lebih detail
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}

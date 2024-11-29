import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';

// Memuat file .env
dotenv.config();

// Konfigurasi handler untuk permintaan pembayaran
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { price, type, formData } = req.body;

            // Validasi data input
            if (!price || !type) {
                return res.status(400).json({ error: 'Price and type are required' });
            }

            // Konfigurasi Midtrans
            const snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

            // Membersihkan harga dari format Rupiah
            const cleanPrice = parseInt(price.replace(/[^0-9]/g, ''));
            const parameter = {
                transaction_details: {
                    order_id: 'order-id-' + new Date().getTime(),
                    gross_amount: cleanPrice,
                },
                item_details: [
                    {
                        id: 'item-1',
                        name: type,
                        price: cleanPrice,
                        quantity: 1,
                    },
                ],
            };

            // Membuat transaksi
            const transaction = await snap.createTransaction(parameter);

            // Mengembalikan token transaksi ke frontend
            res.status(200).json({ token: transaction.token });
        } catch (error) {
            console.error('Error processing payment:', error);
            res.status(500).json({ error: 'Payment processing failed.' });
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}

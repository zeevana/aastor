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

            // Konversi price menjadi angka jika bukan string
            let cleanPrice;
            if (typeof price === 'string') {
                cleanPrice = parseInt(price.replace(/[^0-9]/g, '')); // Hapus simbol non-angka
            } else if (typeof price === 'number') {
                cleanPrice = price; // Langsung gunakan jika angka
            } else {
                throw new Error('Invalid price format');
            }

            if (isNaN(cleanPrice)) {
                return res.status(400).json({ error: 'Price must be a valid number' });
            }

            // Konfigurasi Midtrans
            const snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

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
            res.status(500).json({ error: 'Payment processing failed.', details: error.message });
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}

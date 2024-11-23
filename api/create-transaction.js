import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';

// Pastikan untuk memuat file .env
dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { price, type } = req.body;

            // Pastikan data price dan type ada dan valid
            if (!price || !type) {
                return res.status(400).json({ error: 'Price and type are required' });
            }

            // Ambil kunci dari environment variables
            const serverKey = process.env.MIDTRANS_SERVER_KEY;
            const clientKey = process.env.MIDTRANS_CLIENT_KEY;

            // Pastikan serverKey dan clientKey ada
            if (!serverKey || !clientKey) {
                return res.status(500).json({ error: 'Midtrans keys are not properly set up' });
            }

            // Konfigurasi Midtrans menggunakan kunci dari environment variables
            const snap = new midtransClient.Snap({
                isProduction: false,  // Gunakan false untuk sandbox
                serverKey,  // Ambil kunci dari environment
                clientKey  // Ambil kunci dari environment
            });

            // Proses harga (pastikan harga diproses dengan benar, menghapus simbol dan koma)
            const cleanPrice = parseInt(price.replace('Rp', '').replace('.', '').replace(',', '').trim());

            // Debug log untuk harga bersih
            console.log('Clean Price:', cleanPrice);

            // Validasi jika harga bersih tidak valid
            if (typeof cleanPrice !== 'number') {
                return res.status(400).json({ error: 'Price must be a number' });
            }

            // Siapkan parameter untuk transaksi
            const parameter = {
                transaction_details: {
                    order_id: 'order-id-' + new Date().getTime(),  // Membuat order_id unik berdasarkan waktu
                    gross_amount: cleanPrice  // Harga bersih tanpa simbol Rp dan titik
                },
                credit_card: {
                    secure: true  // Mengaktifkan opsi pembayaran kartu kredit yang aman
                },
                item_details: [
                    {
                        id: 'item-1',  // ID produk, bisa disesuaikan jika ada banyak item
                        name: type,  // Nama item dari parameter 'type'
                        price: cleanPrice,  // Harga item bersih
                        quantity: 1  // Jumlah item (1 item)
                    }
                ]
            };

            // Buat transaksi di Midtrans
            const transaction = await snap.createTransaction(parameter);

            // Debug log untuk token transaksi
            console.log('Transaction Token:', transaction.token);

            // Kirimkan token untuk diproses di frontend
            res.status(200).json({ token: transaction.token });

        } catch (error) {
            // Tangani kesalahan dengan log yang lebih informatif
            console.error('Error creating payment:', error);
            res.status(500).json({ error: error.message || 'Failed to create payment, please try again later.' });
        }
    } else {
        // Jika bukan POST request, kirimkan status 405 Method Not Allowed
        res.status(405).send('Method Not Allowed');
    }
}

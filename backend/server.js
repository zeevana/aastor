const midtransClient = require('midtrans-client');
const express = require('express');
const app = express();
const cors = require('cors');

// Middleware untuk mengizinkan request dari frontend
app.use(cors());
app.use(express.json());

// Konfigurasi Midtrans
const snap = new midtransClient.Snap({
    isProduction: false, // Gunakan false untuk sandbox
    serverKey: 'YOUR_SERVER_KEY',  // Ganti dengan Server Key Anda
    clientKey: 'YOUR_CLIENT_KEY'   // Ganti dengan Client Key Anda
});

// API endpoint untuk membuat transaksi
app.post('/api/create-payment', (req, res) => {
    const { price, type } = req.body;

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

    // Membuat transaksi menggunakan Midtrans
    snap.createTransaction(parameter)
        .then((transaction) => {
            res.json({ redirect_url: transaction.redirect_url });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Payment creation failed');
        });
});

// Menjalankan server pada port 3001
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

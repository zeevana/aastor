// api/create-transaction.js
const axios = require('axios');

export default async function handler(req, res) {
    const { price, type } = req.body;

    const midtransUrl = 'https://app.sandbox.midtrans.com/snap/v1/transactions'; // Midtrans Sandbox URL
    const serverKey = 'SB-Mid-server-wkTyIguA0OaTZ_DeSy13Iyrm'; // Ganti dengan server key Anda

    try {
        // Kirim request ke Midtrans API untuk membuat transaksi
        const response = await axios.post(midtransUrl, {
            transaction_details: {
                order_id: `order-${Date.now()}`, // ID transaksi unik
                gross_amount: parseInt(price.replace(/\D/g, '')), // Konversi harga menjadi angka
            },
            credit_card: {
                secure: true,
            },
            // Anda bisa menambahkan detail lainnya sesuai dengan dokumentasi Midtrans
        }, {
            headers: {
                'Authorization': `Basic ${Buffer.from(serverKey).toString('base64')}`,
            },
        });

        // Kirimkan URL pembayaran ke front-end
        res.status(200).json({ paymentUrl: response.data.redirect_url });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

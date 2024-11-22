import React, { useState } from 'react';

const PaymentPage = () => {
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState('Rp 10.000,-'); // Harga contoh
    const [type, setType] = useState('Item 70 dm');  // Nama item contoh

    const handlePayment = async () => {
        setLoading(true);
        
        const response = await fetch('/api/create-transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: price,
                type: type
            })
        });

        const data = await response.json();

        if (data.redirect_url) {
            // Redirect ke URL pembayaran Midtrans
            window.location.href = data.redirect_url;
        } else {
            alert('Terjadi kesalahan saat memproses pembayaran');
        }

        setLoading(false);
    };

    return (
        <div className="payment-container">
            <div className="payment-header">
                <h3>Halaman Pembayaran</h3>
            </div>
            <div className="payment-details">
                <h4>Item: {type}</h4>
                <p>Price: {price}</p>
            </div>
            <button 
                className="payment-button" 
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? 'Memuat Pembayaran...' : 'Bayar Sekarang'}
            </button>
        </div>
    );
};

export default PaymentPage;

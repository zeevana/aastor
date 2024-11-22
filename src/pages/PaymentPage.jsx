import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const { amount = 0, type = "Unknown" } = location.state || {};  // Mengambil data yang dikirimkan dari halaman sebelumnya

    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(amount);  // Harga yang diterima
    const [itemType, setItemType] = useState(type);  // Nama item yang diterima

    const handlePayment = async () => {
        setLoading(true);

        const response = await fetch('/api/create-transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: `Rp ${price.toLocaleString()}`,  // Format harga dalam format Rp
                type: itemType,
            }),
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
                <h4>Item: {itemType}</h4>
                <p>Price: Rp {price.toLocaleString()}</p>
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

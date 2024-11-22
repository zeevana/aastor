import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const { amount, type, image } = location.state || {};  // Mengambil data yang dikirimkan

    const [loading, setLoading] = useState(false);

    // Fungsi untuk menangani pembayaran
    const handlePayment = async () => {
        setLoading(true);
        
        const response = await fetch('/api/create-transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: `Rp ${amount.toLocaleString()}`,  // Format harga dengan pemisah ribuan
                type: type
            })
        });

        const data = await response.json();

        if (data.redirect_url) {
            // Redirect ke URL pembayaran (misalnya ke Midtrans)
            window.location.href = data.redirect_url;
        } else {
            alert('Terjadi kesalahan saat memproses pembayaran');
        }

        setLoading(false);
    };

    useEffect(() => {
        console.log('Data yang diterima di PaymentPage:', { amount, type, image }); // Debug data yang diterima
    }, [amount, type, image]);

    return (
        <div className="payment-container">
            <div className="payment-header">
                <h3>Halaman Pembayaran</h3>
            </div>
            <div className="payment-details">
                <h4>Item: {type}</h4>
                <p>Price: Rp {amount.toLocaleString()}</p>
                <img src={image} alt={type} width="100" />
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

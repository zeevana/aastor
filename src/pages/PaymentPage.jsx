import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();  // Ambil data dari location.state
  const { price, type, image } = location.state || {};  // Gunakan default object jika data tidak ada

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Data yang diterima:', { price, type, image });  // Debugging data yang diterima
  }, [price, type, image]);

  // Jika data tidak ada, tampilkan pesan error atau lakukan pengecekan.
  if (!price || !type || !image) {
    return <div>Error: Data tidak ditemukan.</div>;
  }

  const handlePayment = async () => {
    setLoading(true);

    const response = await fetch('/api/create-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: `Rp ${price.toLocaleString()}`,  // Format harga dengan pemisah ribuan
        type: type,
      }),
    });

    const data = await response.json();

    if (data.redirect_url) {
      // Redirect ke URL pembayaran Midtrans (atau sistem lain)
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
        <p>Price: Rp {price.toLocaleString()}</p>
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

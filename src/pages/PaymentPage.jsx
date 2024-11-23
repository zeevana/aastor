import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, type, image } = location.state || {};

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Data yang diterima:", { price, type, image });
  }, [price, type, image]);

  if (!price || !type || !image) {
    return (
      <div>
        <p>Error: Data tidak ditemukan.</p>
        <a href="/product">Kembali ke Produk</a>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: price,  // Harga yang dikirimkan
          type: type,
        }),
      });
  
      const data = await response.json();
      console.log('Response Data:', data);  // Tambahkan log ini untuk melihat apa yang dikembalikan server
      
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert('Terjadi kesalahan saat memproses pembayaran: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);  // Log error dari fetch
      alert('Gagal memproses pembayaran. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="payment-container">
      <h3>Halaman Pembayaran</h3>
      <div className="payment-details">
        <h4>Item: {type}</h4>
        <p>Price: Rp {price.toLocaleString()}</p>
        <img src={image} alt={type} width="100" />
      </div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Memuat Pembayaran..." : "Bayar Sekarang"}
      </button>
    </div>
  );
};

export default PaymentPage;

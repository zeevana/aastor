// PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve data from sessionStorage
    const savedData = sessionStorage.getItem('paymentData');
    if (savedData) {
      setPaymentData(JSON.parse(savedData));
    }
  }, []);

  if (!paymentData) {
    return (
      <div className="error-container">
        <p className="error-message">Error: Data tidak ditemukan.</p>
        <button 
          className="back-button"
          onClick={() => navigate("/product")}
        >
          Kembali ke Produk
        </button>
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
          price: paymentData.price,
          type: paymentData.type,
        }),
      });
  
      const data = await response.json();
      
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert('Terjadi kesalahan saat memproses pembayaran: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal memproses pembayaran. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Detail Pembayaran</h2>
        
        <div className="payment-info">
          <div className="product-preview">
            <img 
              src={paymentData.image} 
              alt={paymentData.type} 
              className="payment-image"
            />
            <h3 className="product-name">{paymentData.title}</h3>
          </div>
          
          <div className="payment-details">
            <div className="detail-item">
              <span className="detail-label">Tipe:</span>
              <span className="detail-value">{paymentData.type}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Harga:</span>
              <span className="detail-value">
                Rp {paymentData.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <button 
          className="payment-button"
          onClick={handlePayment} 
          disabled={loading}
        >
          {loading ? "Memproses Pembayaran..." : "Bayar Sekarang"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
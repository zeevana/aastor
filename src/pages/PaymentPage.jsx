// PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    setError(null);

    try {
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: paymentData.productId,
          type: paymentData.type,
          price: paymentData.price
        }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat memproses pembayaran');
      }
      
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        throw new Error('URL pembayaran tidak ditemukan');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
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
              src={paymentData.productImage} 
              alt={paymentData.productTitle} 
              className="payment-image"
            />
            <h3 className="product-name">{paymentData.productTitle}</h3>
          </div>
          
          <div className="payment-details">
            <div className="detail-item">
              <span className="detail-label">Item:</span>
              <div className="detail-value-container">
                {paymentData.itemImage && (
                  <img 
                    src={paymentData.itemImage} 
                    alt={paymentData.type} 
                    className="currency-icon-small"
                  />
                )}
                <span className="detail-value">{paymentData.type}</span>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-label">Harga:</span>
              <span className="detail-value price">
                Rp {paymentData.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

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
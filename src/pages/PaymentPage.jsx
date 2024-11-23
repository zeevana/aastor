import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPaymentData = () => {
      try {
        const savedData = localStorage.getItem("paymentData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const isExpired = Date.now() - parsedData.timestamp > 15 * 60 * 1000;
          if (isExpired) {
            setError("Sesi pembayaran telah berakhir. Silakan pilih produk kembali.");
            localStorage.removeItem("paymentData");
            return;
          }
          setPaymentData(parsedData);
          setError(null);
        } else {
          setError("Data pembayaran tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error loading payment data:", error);
        setError("Terjadi kesalahan saat memuat data pembayaran.");
      }
    };

    loadPaymentData();

    const handlePaymentUpdate = (event) => {
      setPaymentData(event.detail);
      setError(null);
    };

    window.addEventListener("paymentDataUpdated", handlePaymentUpdate);

    return () => {
      window.removeEventListener("paymentDataUpdated", handlePaymentUpdate);
    };
  }, []);

  const handlePayment = async () => {
    if (!paymentData) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: paymentData.productId,
          type: paymentData.type,
          price: String(paymentData.price),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Terjadi kesalahan saat memproses pembayaran");
      }

      const data = await response.json();

      if (data.redirect_url) {
        localStorage.removeItem("paymentData");
        window.location.href = data.redirect_url;
      } else {
        throw new Error("URL pembayaran tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!paymentData) {
    return (
      <div className="error-container">
        <p className="error-message">{error || "Data tidak ditemukan."}</p>
        <button className="back-button" onClick={() => navigate("/product")}>
          Kembali ke Produk
        </button>
      </div>
    );
  }

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
              <span className="detail-value">{paymentData.type}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Harga:</span>
              <span className="detail-value price">
                Rp {paymentData.price.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
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

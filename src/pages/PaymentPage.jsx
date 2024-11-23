import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data yang dikirim melalui navigasi
  const { state } = location;
  const { harga, kelas } = state || {};

  // State untuk loading, error, dan pembayaran
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePayment = async () => {
    if (isPopupOpen) return; // Prevent multiple clicks while the popup is open
    setIsPopupOpen(true);
  
    try {
      const response = await fetch("/api/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: String(harga.price),
          type: harga.type,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Terjadi kesalahan saat memproses pembayaran");
      }
  
      const data = await response.json();
  
      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: (result) => {
            console.log("Success:", result);
            alert("Pembayaran berhasil!");
            setIsPopupOpen(false);
          },
          onPending: (result) => {
            console.log("Pending:", result);
            alert("Pembayaran tertunda.");
            setIsPopupOpen(false);
          },
          onError: (error) => {
            console.error("Error:", error);
            alert("Pembayaran gagal.");
            setIsPopupOpen(false);
          },
          onClose: () => {
            alert("Anda menutup halaman pembayaran.");
            setIsPopupOpen(false);
          },
        });
      } else {
        throw new Error("Token pembayaran tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Gagal memproses pembayaran");
      setIsPopupOpen(false);
    }
  };
  
  
  
  

  // Jika data tidak ditemukan, tampilkan pesan error
  if (!harga || !kelas) {
    return (
      <div className="error-container">
        <p>Data pembayaran tidak ditemukan.</p>
        <button onClick={() => navigate(-1)}>Kembali</button>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Detail Pembayaran</h2>

        <div className="payment-info">
          <div className="product-preview">
            <img src={kelas.image} alt={kelas.title} className="payment-image" />
            <h3 className="product-name">{kelas.title}</h3>
          </div>

          <div className="payment-details">
            <div className="detail-item">
              <span className="detail-label">Item:</span>
              <span className="detail-value">{harga.type}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Harga:</span>
              <span className="detail-value price">
                Rp {harga.price.toLocaleString("id-ID")}
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

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data yang dikirim melalui state
  const { state } = location;
  const { harga, kelas } = state || {};

  // Jika tidak ada data, tampilkan pesan error
  if (!harga || !kelas) {
    return (
      <div className="error-container">
        <p>Data pembayaran tidak ditemukan.</p>
        <button onClick={() => navigate(-1)}>Kembali</button>
      </div>
    );
  }

  // Render halaman pembayaran
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

        <button
          className="payment-button"
          onClick={() => alert("Pembayaran diproses...")}
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

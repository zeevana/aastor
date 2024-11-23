import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data yang dikirim melalui state
  const { state } = location;
  const { harga, kelas } = state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Jika tidak ada data, tampilkan pesan error
  if (!harga || !kelas) {
    return (
      <div className="error-container">
        <p>Data pembayaran tidak ditemukan.</p>
        <button onClick={() => navigate(-1)}>Kembali</button>
      </div>
    );
  }

  // Fungsi untuk memproses pembayaran
  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Request ke server backend untuk mendapatkan token Midtrans
      const response = await axios.post("/api/transaction", {
        amount: harga.price,
        product: `${kelas.title} - ${harga.type}`,
      });

      const { token } = response.data;

      // Panggil Snap untuk memproses pembayaran
      window.snap.pay(token, {
        onSuccess: (result) => {
          alert("Pembayaran berhasil!");
          console.log(result);
        },
        onPending: (result) => {
          alert("Pembayaran sedang diproses.");
          console.log(result);
        },
        onError: (result) => {
          alert("Pembayaran gagal.");
          console.error(result);
        },
        onClose: () => {
          alert("Pembayaran dibatalkan.");
        },
      });
    } catch (err) {
      console.error(err);
      setError("Gagal memproses pembayaran. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

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

        {error && <p className="error-message">{error}</p>}

        <button
          className="payment-button"
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? "Memproses..." : "Bayar Sekarang"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedItem, kelas, formData } = state || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setError(null);

    try {
        const response = await fetch("/api/create-transaction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                price: Number(selectedItem.price),
                type: selectedItem.type,
                formData,
            }),
        });

        if (!response.ok) {
            throw new Error("Gagal mendapatkan respons dari server");
        }

        const data = await response.json();

        if (data.token) {
            window.snap.pay(data.token, {
                onSuccess: (result) => {
                    // Format data untuk pesan WhatsApp
                    const message = `
Halo, Saya telah melakukan pembayaran dengan detail berikut:

- Game  : ${kelas.title}
- Item  : ${selectedItem.type}
- Harga : Rp ${selectedItem.price.toLocaleString("id-ID")}

- Data Pembeli: ${Object.entries(formData)
                        .map(([key, value]) => `\n  ${key} : ${value}`)
                        .join("")}

Terima kasih!`;

                    // Encode pesan untuk digunakan di URL
                    const encodedMessage = encodeURIComponent(message);

                    // Arahkan ke WhatsApp
                    const whatsappUrl = `https://wa.me/6285269512024?text=${encodedMessage}`;
                    window.location.href = whatsappUrl;
                },
                onPending: (result) => alert("Pembayaran Pending."),
                onError: (error) => alert("Pembayaran Gagal."),
                onClose: () => alert("Pembayaran Dibatalkan."),
            });
        } else {
            throw new Error("Token pembayaran tidak ditemukan.");
        }
    } catch (err) {
        console.error("Error pembayaran:", err);
        setError(err.message || "Terjadi kesalahan.");
    } finally {
        setIsProcessing(false);
    }
};



  if (!selectedItem || !kelas) {
    return (
      <div className="error-container">
        <p>Data tidak ditemukan.</p>
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
              <span className="detail-value">{selectedItem.type}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Harga:</span>
              <span className="detail-value price">
                Rp {selectedItem.price.toLocaleString("id-ID")}
              </span>
            </div>
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="detail-item">
                <span className="detail-label">{key}:</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          className="payment-button"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Memproses Pembayaran..." : "Bayar Sekarang"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

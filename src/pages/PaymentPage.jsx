// PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tryPage } from "../data/index";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { productId, itemId } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPaymentData = () => {
      try {
        // Ambil data dari localStorage
        const savedData = localStorage.getItem("currentPayment");
        
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          
          // Verifikasi data masih valid
          if (parsedData.productId === productId && parsedData.itemId === itemId) {
            // Verifikasi timeout (15 menit)
            const isExpired = Date.now() - parsedData.timestamp > 15 * 60 * 1000;
            
            if (isExpired) {
              setError("Sesi pembayaran telah berakhir. Silakan pilih produk kembali.");
              localStorage.removeItem("currentPayment");
              return;
            }
            
            setPaymentData(parsedData);
            setError(null);
          } else {
            // Jika ID tidak cocok, mungkin user mencoba mengakses URL langsung
            setError("Data pembayaran tidak valid. Silakan pilih produk dari halaman produk.");
          }
        } else {
          // Coba ambil data dari semuaKelas jika URL diakses langsung
          const product = tryPage.find(p => p.id === productId);
          const item = product?.items.find(i => i.id === itemId);
          
          if (product && item) {
            const newPaymentData = {
              productId: product.id,
              productTitle: product.title,
              productImage: product.image,
              itemId: item.id,
              type: item.type,
              price: item.price,
              itemImage: item.image,
              timestamp: Date.now()
            };
            
            localStorage.setItem("currentPayment", JSON.stringify(newPaymentData));
            setPaymentData(newPaymentData);
            setError(null);
          } else {
            setError("Data pembayaran tidak ditemukan. Silakan pilih produk dari halaman produk.");
          }
        }
      } catch (error) {
        console.error("Error loading payment data:", error);
        setError("Terjadi kesalahan saat memuat data pembayaran.");
      }
    };

    loadPaymentData();
  }, [productId, itemId]);

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
          itemId: paymentData.itemId,
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
        // Hapus data payment sebelum redirect
        localStorage.removeItem("currentPayment");
        window.location.href = data.redirect_url;
      } else {
        throw new Error("URL pembayaran tidak ditemukan");
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
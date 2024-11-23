import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { product, item } = location.state || {}; // Ambil data dari state

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!product || !item) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          type: item.type,
          price: String(item.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Terjadi kesalahan saat memproses pembayaran");
      }

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        throw new Error("URL pembayaran tidak ditemukan");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {product && item ? (
        <div>
          <h1>Detail Pembayaran</h1>
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{item.type} - Rp {item.price}</p>
          <button onClick={handlePayment}>
            {loading ? "Memproses Pembayaran..." : "Bayar Sekarang"}
          </button>
        </div>
      ) : (
        <div>
          <h2>Produk tidak ditemukan</h2>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;

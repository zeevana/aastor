import React, { useState } from "react";
import { semuaKelas } from "../data";  // Pastikan path dan nama file sudah benar


const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuy = (product, item) => {
    const paymentData = {
      productId: product.id,
      productTitle: product.title,
      productImage: product.image,
      type: item.type,
      price: item.price,
      itemImage: item.image
    };

    setPaymentData(paymentData);
  };

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
      {!paymentData ? (
        <div>
          <h1>Produk</h1>
          {semuaKelas.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.title}</h3>
              {product.price.map((item, index) => (
                <div key={index}>
                  <p>{item.type}: Rp {item.price}</p>
                  <button onClick={() => handleBuy(product, item)}>
                    Beli Sekarang
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>Detail Pembayaran</h1>
          <img src={paymentData.productImage} alt={paymentData.productTitle} />
          <h2>{paymentData.productTitle}</h2>
          <p>{paymentData.type} - Rp {paymentData.price}</p>
          <button onClick={handlePayment}>
            {loading ? "Memproses Pembayaran..." : "Bayar Sekarang"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;

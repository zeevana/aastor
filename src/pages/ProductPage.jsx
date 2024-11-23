import React from "react";
import { useNavigate } from "react-router-dom";
import { semuaKelas } from "../data/index";

const ProductPage = () => {
  const navigate = useNavigate();

  const handleBuy = (product, item) => {
    try {
      const paymentData = {
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        type: item.type,
        price: item.price,
        itemImage: item.image,
        timestamp: Date.now(), // Untuk validasi waktu jika diperlukan
      };

      // Simpan ke localStorage sebagai cadangan
      localStorage.setItem("paymentData", JSON.stringify(paymentData));

      // Navigasi ke halaman pembayaran dengan state
      navigate("/payment", { state: paymentData });
    } catch (error) {
      console.error("Error saving payment data:", error);
      alert("Terjadi kesalahan saat memproses pembelian. Silakan coba lagi.");
    }
  };

  return (
    <div className="product-container">
      {semuaKelas.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h3 className="product-title">{product.title}</h3>
          <div className="price-container">
            {product.price.map((item, index) => (
              <div key={index} className="price-item">
                <div className="price-info">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.type}
                      className="currency-icon"
                    />
                  )}
                  <p className="price-type">{item.type}</p>
                  <p className="price-amount">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <button
                  className="buy-button"
                  onClick={() => handleBuy(product, item)}
                >
                  Beli Sekarang
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;

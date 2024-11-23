// ProductPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { tryPage } from "../data/index";

const ProductPage = () => {
  const navigate = useNavigate();

  const handleBuy = async (product, item) => {
    try {
      // Persiapkan data pembayaran
      const paymentData = {
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        itemId: item.id,
        type: item.type,
        price: item.price,
        itemImage: item.image,
        timestamp: Date.now()
      };

      // Simpan ke localStorage
      localStorage.setItem("currentPayment", JSON.stringify(paymentData));
      
      // Navigasi ke halaman pembayaran dengan ID item
      navigate(`/payment/${product.id}/${item.id}`);
    } catch (error) {
      console.error("Error preparing payment:", error);
      alert("Terjadi kesalahan saat memproses pembelian. Silakan coba lagi.");
    }
  };

  return (
    <div className="product-container">
      {tryPage.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h3 className="product-title">{product.title}</h3>

          <div className="price-container">
            {product.items.map((item) => (
              <div key={item.id} className="price-item">
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
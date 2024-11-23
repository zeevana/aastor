import React from "react";
import { useNavigate } from "react-router-dom";
import { semuaKelas } from "../data"; // Pastikan data produk ada di sini

const ProductPage = () => {
  const navigate = useNavigate();

  const handleBuy = (product, item) => {
    // Kirim data produk dan item yang dipilih ke halaman payment
    navigate("/payment", { state: { product, item } });
  };

  return (
    <div className="product-container">
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
  );
};

export default ProductPage;

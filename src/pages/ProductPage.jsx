// ProductPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { semuaKelas } from "../data/index";

const ProductPage = () => {
  const navigate = useNavigate();

  const handleBuy = (type, price, image, title) => {
    // Save to sessionStorage to persist data
    const paymentData = { type, price, image, title };
    sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
    navigate("/payment");
  };

  return (
    <div className="product-container">
      {semuaKelas.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} className="product-image" />
          <h3 className="product-title">{product.title}</h3>
          <div className="price-container">
            {product.price.map((item, index) => (
              <div key={index} className="price-item">
                <p className="price-type">{item.type}</p>
                <p className="price-amount">Rp {item.price.toLocaleString("id-ID")}</p>
                <button 
                  className="buy-button"
                  onClick={() => handleBuy(item.type, item.price, product.image, product.title)}
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
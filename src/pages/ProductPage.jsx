import React from "react";
import { useNavigate } from "react-router-dom";
import { semuaKelas } from "../data/index";

const ProductPage = () => {
  const navigate = useNavigate();

  const handleBuy = (type, price, image) => {
    console.log('Data yang dikirim:', { type, price, image });
    navigate("/payment", { state: { price, type, image } });
  };

  return (
    <div className="product-container">
      {semuaKelas.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          {product.price.map((item, index) => (
            <div key={index} className="price-item">
              <p>{item.type}</p>
              <p>Rp {item.price.toLocaleString("id-ID")}</p>
              <button onClick={() => handleBuy(item.type, item.price, product.image)}>
                Beli
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductPage;

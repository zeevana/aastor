import React from "react";
import { useNavigate } from "react-router-dom";
import { semuaKelas } from "../data/index";  // Sesuaikan dengan nama dan lokasi file data Anda

const ProductPage = () => {
  const navigate = useNavigate();

  // Fungsi untuk menangani klik beli
  const handleBuy = (amount, type) => {
    navigate("/payment", { state: { amount, type } });  // Kirimkan data ke halaman pembayaran
  };

  return (
    <div className="product-container">
      {semuaKelas.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          {/* Maping setiap item harga untuk produk */}
          {product.price.map((item, index) => (
            <div key={index} className="price-item">
              <p>{item.type}</p>
              <p>Rp {item.price.toLocaleString("id-ID")}</p>
              {/* Tombol Beli yang akan mengarahkan ke halaman pembayaran */}
              <button onClick={() => handleBuy(item.price, item.type)}>Beli</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductPage;

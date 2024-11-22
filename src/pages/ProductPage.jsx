import React from "react";
import { useNavigate } from "react-router-dom";
import { semuaKelas } from "../data/index";  // Import data produk

const ProductPage = () => {
  const navigate = useNavigate();

  // Fungsi untuk menangani klik beli
  const handleBuy = (type, price, image) => {
    console.log('Mengirim data:', { type, price, image }); // Cek data yang dikirim
    navigate("/payment", { state: { type, price, image } });  // Kirimkan data ke halaman pembayaran
  };

  return (
    <div className="product-container">
      {semuaKelas.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          {/* Mapping setiap item harga untuk produk */}
          {product.price.map((item, index) => (
            <div key={index} className="price-item">
              <p>{item.type}</p>
              <p>Rp {item.price.toLocaleString("id-ID")}</p>
              {/* Tombol Beli yang akan mengarahkan ke halaman pembayaran */}
              <button onClick={() => handleBuy(item.price, item.type, item.image)}>Beli</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductPage;

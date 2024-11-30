import { useParams, useNavigate } from "react-router-dom";
import { semuaKelas, formPay } from "../data/index"; // Pastikan data ini benar-benar diimpor
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";

const KelasDetail = () => {
  const { kelasId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const kelas = semuaKelas.find((kelas) => kelas.id === parseInt(kelasId));
  const formConfig = formPay.find((form) => form.id === parseInt(kelasId));

  useEffect(() => {
    // Debugging untuk memastikan data yang diambil sesuai
    console.log("Kelas:", kelas);
    console.log("Form Config:", formConfig);
  }, [kelas, formConfig]);

  if (!kelas || !formConfig) {
    return <div>Kelas tidak ditemukan</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectItem = (harga) => {
    setSelectedItem(harga);
  };

  const handlePayment = () => {
    const isFormComplete = formConfig.type
      .split(", ")
      .every((field) => formData[field]);

    if (!isFormComplete) {
      alert("Harap isi semua data pada form!");
      return;
    }

    if (!selectedItem) {
      alert("Harap pilih salah satu item!");
      return;
    }

    navigate("/payment", { state: { selectedItem, kelas, formData } });
  };

  return (
    <div className="kelas-detail">
      <div className="header-kelasdetail">
        <div className="logo-container">
          <img src={kelas.image} alt={kelas.title} className="rounded-logo" />
        </div>
        <h1 className="title">{kelas.title}</h1>
        <p className="subtitle">
          Pilih nominal top-up dan isi data untuk melanjutkan pembayaran
        </p>
      </div>

      <div className="card-container">
        {kelas.price.map((harga, index) => (
          <Card
            key={index}
            className={`price-card ${
              selectedItem === harga ? "selected-card" : ""
            }`}
            onClick={() => handleSelectItem(harga)}
          >
            <Card.Body className="d-flex align-items-center">
              <img src={harga.image} alt={harga.type} className="card-image" />
              <div>
                <Card.Title>{harga.type}</Card.Title>
                <Card.Text>Rp {harga.price.toLocaleString("id-ID")}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="form-container">
        {/* Form Input */}
        <form className="form-input">
          {formConfig.type.split(", ").map((field, index) => (
            <input
              key={index}
              type="text"
              name={field}
              value={formData[field] || ""}
              onChange={handleInputChange}
              placeholder={`Masukkan ${field}`}
              className="form-field"
              required
            />
          ))}
        </form>

        {/* Tombol Pembayaran */}
        <button
          className={`submit-btn ${
            formConfig.type
              .split(", ")
              .every((field) => formData[field]) && selectedItem
              ? "active-btn"
              : "disabled-btn"
          }`}
          onClick={handlePayment}
          disabled={
            !formConfig.type.split(", ").every((field) => formData[field]) ||
            !selectedItem
          }
        >
          Lanjutkan ke Pembayaran
        </button>
      </div>
    </div>
  );
};

export default KelasDetail;

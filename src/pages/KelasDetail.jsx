import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { semuaKelas } from "../data/index";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

const KelasDetail = () => {
  const { kelasId } = useParams();
  const navigate = useNavigate();
  const kelas = semuaKelas.find((kelas) => kelas.id === parseInt(kelasId));
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [userData, setUserData] = useState({ id: "", server: "", wa: "" });

  if (!kelas) {
    return <div className="text-center">Kelas tidak ditemukan</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const renderFormFields = () => {
    switch (kelas.title) {
      case "Ghensin Impact":
        return (
          <Form.Group controlId="uid">
            <Form.Label>UID</Form.Label>
            <Form.Control
              type="text"
              name="uid"
              placeholder="Masukkan UID"
              value={userData.uid || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        );
      case "Free Fire":
        return (
          <Form.Group controlId="id">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              placeholder="Masukkan ID"
              value={userData.id || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        );
      case "PUBG":
        return (
          <>
            <Form.Group controlId="id">
              <Form.Label>ID PUBG</Form.Label>
              <Form.Control
                type="text"
                name="id"
                placeholder="Masukkan ID PUBG"
                value={userData.id || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="server">
              <Form.Label>Server</Form.Label>
              <Form.Control
                type="text"
                name="server"
                placeholder="Masukkan Server"
                value={userData.server || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  const handlePayment = async () => {
    if (!selectedPrice || !selectedMethod || !userData.id) {
      alert("Harap lengkapi semua data sebelum melanjutkan.");
      return;
    }

    const payload = {
      price: selectedPrice.price,
      type: selectedPrice.type,
      ...userData,
    };

    try {
      const response = await fetch("/api/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.token) {
        window.snap.pay(result.token);
      } else {
        alert("Gagal memulai pembayaran.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <img src={kelas.image} alt={kelas.title} className="rounded-circle" width="120" />
        <h1 className="mt-3">{kelas.title}</h1>
        <p className="text-muted">Pilih nominal top-up dan isi data untuk melanjutkan pembayaran</p>
      </div>

      {/* Pilihan Nominal */}
      <h3 className="mb-3">Pilih Nominal Top-Up</h3>
      <Row className="g-3">
        {kelas.price.map((harga, index) => (
          <Col md={4} sm={6} xs={12} key={index}>
            <Card
              className={`p-3 shadow-sm ${
                selectedPrice?.type === harga.type ? "border-primary" : ""
              }`}
              onClick={() => setSelectedPrice(harga)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body className="text-center">
                <img src={harga.image} alt={harga.type} width="50" className="mb-2" />
                <Card.Title>{harga.type}</Card.Title>
                <Card.Text className="text-success">Rp {harga.price.toLocaleString("id-ID")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Form Input */}
      <div className="mt-4">
        <h3>Isi Data</h3>
        <Form>
          {renderFormFields()}
          <Form.Group controlId="wa" className="mt-3">
            <Form.Label>Nomor WhatsApp</Form.Label>
            <Form.Control
              type="text"
              name="wa"
              placeholder="Masukkan No. WhatsApp"
              value={userData.wa}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Form>
      </div>

      {/* Metode Pembayaran */}
      <div className="mt-4">
        <h3>Pilih Metode Pembayaran</h3>
        <div className="d-flex gap-3">
          {["Gopay", "Bank Transfer", "Credit Card"].map((method, index) => (
            <Button
              key={index}
              variant={selectedMethod === method ? "primary" : "outline-primary"}
              onClick={() => setSelectedMethod(method)}
            >
              {method}
            </Button>
          ))}
        </div>
      </div>

      {/* Tombol Submit */}
      <div className="mt-4 text-center">
        <Button
          variant="success"
          size="lg"
          onClick={handlePayment}
          disabled={!selectedPrice || !selectedMethod || !userData.id}
        >
          Lanjutkan ke Pembayaran
        </Button>
      </div>
    </div>
  );
};

export default KelasDetail;

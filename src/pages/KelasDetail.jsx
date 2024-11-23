import { useParams, useNavigate } from "react-router-dom";
import { semuaKelas } from "../data/index";
import { Card } from "react-bootstrap";

const KelasDetail = () => {
  const { kelasId } = useParams();
  const navigate = useNavigate();

  // Cari kelas berdasarkan ID
  const kelas = semuaKelas.find((kelas) => kelas.id === kelasId);

  // Periksa apakah kelas ditemukan
  if (!kelas) {
    return <div>Kelas tidak ditemukan</div>;
  }

  // Fungsi untuk menangani klik pada item harga
  const handleBuy = (harga) => {
    navigate("/payment", { state: { harga, kelas } }); // Mengirim data harga & kelas ke PaymentPage
  };

  return (
    <div className="box-kl">
      <div className="logo-k mb-3">
        <img src={kelas.image} alt={kelas.title} className="logo-l" />
      </div>

      <h3 className="mb-4">Harga:</h3>
      <div className="card-container">
        {kelas.price.map((harga, index) => (
          <Card key={index} className="mb-3" onClick={() => handleBuy(harga)}>
            <Card.Body className="d-flex align-items-center">
              {/* Gambar di samping kiri */}
              <img
                src={harga.image}
                alt="gambar"
                style={{ width: "35px", marginRight: "20px" }}
              />
              <div>
                <Card.Title>{harga.type}</Card.Title>
                <Card.Text>Rp {harga.price.toLocaleString("id-ID")}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KelasDetail;

import { useParams, useNavigate } from 'react-router-dom'; 
import { semuaKelas } from '../data/index'; 
import { Card, Button } from 'react-bootstrap';

const KelasDetail = () => {
    const { kelasId } = useParams();
    const navigate = useNavigate();  // Gantilah useHistory dengan useNavigate

    // Cari kelas berdasarkan ID yang diberikan
    const kelas = semuaKelas.find(kelas => kelas.id === parseInt(kelasId));

    // Periksa apakah kelas ditemukan
    if (!kelas) {
        return <div>Kelas tidak ditemukan</div>;
    }

    // Fungsi untuk menangani klik tombol "Beli"
    const handleBuy = (harga) => {
        // Kirim data harga yang dipilih ke halaman pembayaran
        navigate('/payment', { state: { harga } });  // Gantilah history.push dengan navigate
    };

    return (
        <div className='box-kl'>
            <div className='logo-k mb-3'>
                <img src={kelas.image} alt={kelas.title} className='logo-l' />
            </div>

            <h3 className='mb-4'>Harga:</h3>
            <div className="card-container">
                {kelas.price.map((harga, index) => (
                    <Card key={index} className="mb-3">
                        <Card.Body className="d-flex align-items-center">
                            {/* Gambar disamping kiri */}
                            <img src={harga.image} alt="gambar" style={{ width: '35px', marginRight: '20px' }} />
                            <div>
                                {/* Harga type */}
                                <Card.Title>{harga.type}</Card.Title>
                                {/* Harga price */}
                                <Card.Text>{harga.price}</Card.Text>
                            </div>
                            {/* Tombol Beli */}
                            <Button onClick={() => handleBuy(harga)} variant="primary">Beli</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default KelasDetail;

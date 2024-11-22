import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios'; // Untuk melakukan request API ke server

const PaymentPage = () => {
    const location = useLocation();
    const { harga } = location.state; // Ambil data harga yang dikirimkan

    const [paymentUrl, setPaymentUrl] = useState('');

    useEffect(() => {
        // Kirim data harga ke server untuk membuat transaksi Midtrans
        const createTransaction = async () => {
            try {
                const response = await axios.post('/api/create-transaction', {
                    price: harga.price,
                    type: harga.type,
                    // Anda bisa menambahkan data pengguna di sini jika diperlukan
                });

                // Dapatkan URL pembayaran dari respons server
                setPaymentUrl(response.data.paymentUrl); 
            } catch (error) {
                console.error('Error creating transaction', error);
            }
        };

        createTransaction();
    }, [harga]);

    return (
        <div>
            <h3>Detail Pembayaran</h3>
            <p>Item: {harga.type}</p>
            <p>Harga: {harga.price}</p>
            
            {/* Menampilkan tombol untuk melanjutkan pembayaran ke Midtrans */}
            {paymentUrl ? (
                <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="success">Lanjutkan Pembayaran</Button>
                </a>
            ) : (
                <p>Memuat pembayaran...</p>
            )}
        </div>
    );
};

export default PaymentPage;

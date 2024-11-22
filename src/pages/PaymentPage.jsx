import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const PaymentPage = () => {
    const { state } = useLocation();
    const [paymentUrl, setPaymentUrl] = useState('');

    useEffect(() => {
        if (state && state.harga) {
            // Kirim request ke backend untuk membuat transaksi di Midtrans
            axios.post('/api/create-transaction', {
                price: state.harga.price,
                type: state.harga.type
            })
            .then(response => {
                setPaymentUrl(response.data.redirect_url);  // URL untuk melanjutkan pembayaran
            })
            .catch(error => {
                console.error("Error during Midtrans payment creation:", error);
            });
        }
    }, [state]);

    return (
        <div className="payment-container">
            <h2>Payment Page</h2>
            <div className="payment-summary">
                <p>Item: {state.harga.type}</p>
                <p>Price: {state.harga.price}</p>
            </div>

            <div className="payment-gate">
                {paymentUrl ? (
                    <Button variant="success" onClick={() => window.location.href = paymentUrl}>
                        Proceed to Payment
                    </Button>
                ) : (
                    <p>Loading payment gateway...</p>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;

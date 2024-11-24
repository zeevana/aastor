import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditionsComponent = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Syarat & Ketentuan</h1>
      <div className="terms-content">
        <p>
          Selamat datang di <strong>AaStore</strong>. Dengan menggunakan layanan kami, Anda dianggap telah menyetujui Syarat & Ketentuan berikut:
        </p>
        <h2>1. Ketentuan Umum</h2>
        <ul>
          <li>Layanan hanya dapat digunakan untuk tujuan yang sah dan sesuai dengan hukum yang berlaku.</li>
          <li>Pengguna bertanggung jawab untuk menjaga kerahasiaan informasi akun mereka.</li>
        </ul>
        <h2>2. Kebijakan Pembayaran</h2>
        <ul>
          <li>Semua transaksi pembayaran harus dilakukan melalui metode pembayaran resmi yang kami sediakan.</li>
          <li>Setelah pembayaran berhasil, transaksi tidak dapat dibatalkan.</li>
        </ul>
        <h2>3. Hak Kami</h2>
        <ul>
          <li>Kami berhak mengubah, menangguhkan, atau menghentikan layanan sewaktu-waktu tanpa pemberitahuan sebelumnya.</li>
          <li>Kami tidak bertanggung jawab atas kerugian akibat penggunaan layanan kami.</li>
        </ul>
        <h2>4. Pembaruan Kebijakan</h2>
        <p>
          Syarat & Ketentuan ini dapat berubah sewaktu-waktu. Silakan periksa halaman ini secara berkala untuk mengetahui pembaruan.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsComponent;

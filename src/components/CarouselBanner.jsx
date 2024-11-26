import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselBanner = () => {
  const banners = [
    {
      id: 1,
      title: "Top Up Murah dan Aman",
      subtitle: "Save Up to 20%",
      image: "https://via.placeholder.com/1024x400?text=Banner+1", // Ganti dengan URL gambar Anda
    },
    {
      id: 2,
      title: "Giveaway Bulanan",
      subtitle: "Dapatkan Headset Gratis",
      image: "https://via.placeholder.com/1024x400?text=Banner+2", // Ganti dengan URL gambar Anda
    },
    {
      id: 3,
      title: "Promo Spesial",
      subtitle: "Nikmati Diskon Hingga 50%",
      image: "https://via.placeholder.com/1024x400?text=Banner+3", // Ganti dengan URL gambar Anda
    },
  ];

  return (
    <Carousel>
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
          />
          <Carousel.Caption>
            <h3>{banner.title}</h3>
            <p>{banner.subtitle}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselBanner;

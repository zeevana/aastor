import React from "react";
import { Carousel } from "react-bootstrap";
import banner1 from "../assets/img/banner/1.png";
import banner2 from "../assets/img/banner/2.png";


const CarouselBanner = () => {
  const banners = [
    {
      id: 1,
      //title: "Top Up Murah dan Aman",
      //subtitle: "Save Up to 20%",
      image:banner1, // Ganti dengan URL gambar Anda
    },
    {
      id: 2,
      //title: "Giveaway Bulanan",
      //subtitle: "Dapatkan Headset Gratis",
      image: banner2, // Ganti dengan URL gambar Anda
    },
    {
      id: 3,
      //title: "Promo Spesial",
      //subtitle: "Nikmati Diskon Hingga 50%",
      image: banner1, // Ganti dengan URL gambar Anda
    },
  ];

  return (
    <Carousel>
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <img
            className="d-block w-100"
            src={banner.image}
            //alt={banner.title}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselBanner;

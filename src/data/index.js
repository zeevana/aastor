import KelasImage1 from "../assets/img/kelas/kelas-1.jpg";
import KelasImage2 from "../assets/img/kelas/kelas-2.jpg";
import KelasImage3 from "../assets/img/kelas/kelas-3.jpg";
import KelasImage4 from "../assets/img/kelas/kelas-4.jpg";
import KelasImage5 from "../assets/img/kelas/kelas-5.jpg";
import KelasImage6 from "../assets/img/kelas/kelas-6.jpg";
import KelasImage7 from "../assets/img/kelas/kelas-7.jpg";
import KelasImage8 from "../assets/img/kelas/kelas-8.jpg";
import KelasImage9 from "../assets/img/kelas/kelas-9.jpg";

import People1 from "../assets/img/testimonial/people-1.jpg";
import People2 from "../assets/img/testimonial/people-2.jpg";
import People3 from "../assets/img/testimonial/people-3.jpg";

import Diamond from "../assets/img/kelas/diamond.png";
import Welkin from "../assets/img/kelas/Welkin.png";
import Uc from "../assets/img/kelas/uc.png";

import DanaLogo from "../assets/img/payment/dana.png";
import GopayLogo from "../assets/img/payment/gopay.png";
import BriLogo from "../assets/img/payment/bri.png";
import MandiriLogo from "../assets/img/payment/mandiri.png";

export const paymentMethods = [
  { imgSrc: DanaLogo, altText: "Dana" },
  { imgSrc: GopayLogo, altText: "GoPay" },
  { imgSrc: BriLogo, altText: "BRI" },
  { imgSrc: MandiriLogo, altText: "Mandiri" },
];

export const navLinks = [
  {
    id: 1,
    path: "",
    text: "Home",
  },
  {
    id: 2,
    path: "kelas",
    text: "List game",
  },
  {
    id: 3,
    path: "testimonial",
    text: "Testimonial",
  },
  {
    id: 4,
    path: "faq",
    text: "FAQ",
  },
  {
    id: 5,
    path: "terms-and-conditions",
    text: "Syarat & Ketentuan",
  },
];

export const semuaKelas = [
  {
    id: 1,
    image: KelasImage1,
    title: "Ghensin Impact",
    price: [
      { type: "moon x1", price: 62000, image: Welkin },
      { type: "moon x2", price: 122000, image: Welkin },
      { type: "moon x3", price: 182000, image: Welkin },
      { type: "moon x4", price: 240000, image: Welkin },
      { type: "moon x5", price: 300000, image: Welkin },
    ],
    category: ['game_pc', 'game_android', 'game_populer'],
    delay: "1300",
  },
  {
    id: 2,
    image: KelasImage2,
    title: "Free Fire",
    price: [
      { type: "70", price: 11000, image: Diamond },
      { type: "100", price: 16000, image: Diamond },
      { type: "140", price: 21000, image: Diamond },
      { type: "210", price: 31000, image: Diamond },
      { type: "280", price: 41000, image: Diamond },
      { type: "355", price: 51000, image: Diamond },
      { type: "420", price: 61000, image: Diamond },
      { type: "500", price: 71000, image: Diamond },
      { type: "720", price: 99000, image: Diamond },
      { type: "1000", price: 140000, image: Diamond },
      { type: "2160", price: 300000, image: Diamond },
    ],
    category: ["game_populer", "game_android"],
    delay: "1600",
  },
  {
    id: 3,
    image: KelasImage3,
    title: "Mobile Legend",
    price: [
      { type: "28 dm", price: 10000, image: Diamond },
      { type: "85 dm", price: 25000, image: Diamond },
      { type: "110 dm", price: 34000, image: Diamond },
      { type: "258 dm", price: 75000, image: Diamond },
      { type: "356 dm", price: 105000, image: Diamond },
      { type: "568 dm", price: 155000, image: Diamond },
      { type: "875 dm", price: 235000, image: Diamond },
      { type: "1159 dm", price: 310000, image: Diamond },
      { type: "1506 dm", price: 408000, image: Diamond },
      { type: "2232 dm", price: 570000, image: Diamond },
    ],
    category: ["game_android", 'game_populer'],
    delay: "1900",
  },
  {
    id: 4,
    image: KelasImage4,
    title: "PUBG Mobile",
    price: [
      { type: "60 uc", price: 15000, image: Uc },
      { type: "325 uc", price: 67000, image: Uc },
      { type: "660 uc", price: 130000, image: Uc },
      { type: "1800 uc", price: 335000, image: Uc },
    ],
    category: ["game_populer", 'game_android'],
    delay: "",
  },
  {
    id: 5,
    image: KelasImage5,
    title: "Roblox",
    price: [
      { type: "2000 Robux", price: 378000 },
      { type: "4500 Robux", price: 800000 },
      { type: "10.000 Robux", price: 1550000 },
    ],
    category: "game_populer",
    delay: "300",
  },
  {
    id: 6,
    image: KelasImage6,
    title: "Valorant",
    price: [
      { type: "moon x1", price: 100000 },
      { type: "moon x2", price: 200000 },
      { type: "moon x3", price: 300000 },
    ],
    category: "game_pc",
    delay: "600",
  },
  {
    id: 7,
    image: KelasImage7,
    title: "Clash of Clans ",
    price: [
      { type: "moon x1", price: 100000 },
      { type: "moon x2", price: 200000 },
      { type: "moon x3", price: 300000 },
    ],
    category: "game_populer",
    delay: "",
  },
  {
    id: 8,
    image: KelasImage8,
    title: "Undawn",
    price: [
      { type: "moon x1", price: 100000 },
      { type: "moon x2", price: 200000 },
      { type: "moon x3", price: 300000 },
    ],
    category: "game_populer",
    delay: "300",
  },
  {
    id: 9,
    image: KelasImage9,
    title: "Black Clover",
    price: [
      { type: "moon x1", price: 100000 },
      { type: "moon x2", price: 200000 },
      { type: "moon x3", price: 300000 },
    ],
    category: "game_android",
    delay: "600",
  },
];

export const testimonial = [
  {
    id: 1,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People1,
    name: "People 1",
    skill: "UI UX Designer",
  },
  {
    id: 2,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People2,
    name: "People 2",
    skill: "Flutter Developer",
  },
  {
    id: 3,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People3,
    name: "People 3",
    skill: "Web Developer",
  },
  {
    id: 4,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People1,
    name: "People 4",
    skill: "UI UX Designer",
  },
  {
    id: 5,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People2,
    name: "People 5",
    skill: "Flutter Developer",
  },
  {
    id: 6,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People3,
    name: "People 6",
    skill: "Web Developer",
  },
  {
    id: 7,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People1,
    name: "People 7",
    skill: "UI UX Designer",
  },
  {
    id: 8,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People2,
    name: "People 8",
    skill: "Flutter Developer",
  },
  {
    id: 9,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People3,
    name: "People 9",
    skill: "Web Developer",
  },
];

export const listG = [
  {
  id: 1,
  eventKey: 0,
  title: "Ghensin Impact",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.",
},

];

export const dataSwiper = [
  {
    id: 1,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People1,
    name: "People 1",
    skill: "UI UX Designer",
  },
  {
    id: 2,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People2,
    name: "People 2",
    skill: "Flutter Developer",
  },
  {
    id: 3,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People3,
    name: "People 3",
    skill: "Web Developer",
  },
  {
    id: 4,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People1,
    name: "People 4",
    skill: "UI UX Designer",
  },
  {
    id: 5,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People2,
    name: "People 5",
    skill: "Flutter Developer",
  },
  {
    id: 6,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People3,
    name: "People 6",
    skill: "Web Developer",
  },
  
];

export const faq = [
  {
    id: 1,
    eventKey: 0,
    title: "Bagaimana cara Top Up?",
    desc: "Hubungi no wa admin di pojok kiri bawah",
  },
  {
    id: 2,
    eventKey: 1,
    title: "Bagaimana Sistem Pembayarannya?",
    desc: "Mudah, chat admin lalu lakukan pembayaran melalui transfer Bank, E-Wallet",
  },
  {
    id: 3,
    eventKey: 2,
    title: "Apakah Boleh Hutang dulu?",
    desc: "SKIPPPPPPP",
  },
  {
    id: 4,
    eventKey: 3,
    title: "Apakah Top Up Disini Aman?",
    desc: "Tentu saja, aman dan legal",
  },
];

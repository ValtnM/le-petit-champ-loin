"use client";
import Image from "next/image";
import styles from "./SwiperProduct.module.scss";
import "./global.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

export default function SwiperComponent({ photos }) {
  return (
    <Swiper
      className={styles.swiper}
      modules={[ Navigation]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
    >
      {photos.map((photo, index) => (
        <SwiperSlide className={styles.slide} key={index}>
          <Image
            className={styles.photo}
            src={`http://localhost:8080/api/images/${photo.name}`}
            width={400}
            height={300}
            alt="Photo de légume"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

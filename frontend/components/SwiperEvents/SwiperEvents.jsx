"use client";
import Image from "next/image";
import {getMonthName, getDayName} from "../../utils/functions";
import styles from "./SwiperEvents.module.scss";
import "./global.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

export default function SwiperComponent({ events }) {

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = getDayName(String(date.getDay()));
    const num = String(date.getDate()).padStart(2, "0");
    const month = getMonthName(String(date.getMonth() + 1));

    return `${day} ${num} ${month}`;
  }
  

  return (
    <Swiper
      className={styles.swiper}
      modules={[Pagination, Navigation]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {events.map((event, index) => (
        <SwiperSlide className={styles.slide} key={index}>
          <h3>{event.title}</h3>
          <div className={styles.location}>
            <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
            <p>{event.location}</p>
          </div>
          <div className={styles.schedule}>
            <FontAwesomeIcon className={styles.icon} icon={faClock} />
            <p>{event.schedule}</p>
          </div>
          <div className={styles.date}>
            <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
            <p>{formatDate(event.date)}</p>
          </div>
          {event.EventUsers.length > 0 && (
            <div>
              {event.EventUsers.map((user, index) => (
                <Image
                  className={styles.photo}
                  key={index}
                  src={`http://${process.env.NEXT_PUBLIC_IP_SERVER}:8080/api/images/${user.photo}`}
                  width={100}
                  height={100}
                  alt="Photo"
                />
              ))}
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

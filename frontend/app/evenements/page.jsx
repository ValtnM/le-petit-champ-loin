import styles from "./evenements.module.scss";
// import Slider from "../../components/Slider/Slider";
import Image from "next/image";
import SwipperComponent from "../../components/Swiper/Swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

export default async function page() {
  const eventRes = await fetch("http://localhost:8080/api/event/", {
    method: "POST",
  });
  const events = await eventRes.json();

  const locationRes = await fetch("http://localhost:8080/api/location/", {
    method: "POST",
  });
  const locations = await locationRes.json();
  console.log(locations);

  return (
    <main className={styles.evenement}>
      {events && (
        <section>
          <h2>Événement à venir...</h2>
          <SwipperComponent events={events} />
        </section>
      )}

      {locations && (
        <section className={styles.locations}>
          <h2>Les marchés</h2>
          {locations.map((location, index) => (
            <article key={index}>
              <Image
                className={styles.photo}
                src={`http://localhost:8080/api/images/${location.photo}`}
                width={1024}
                height={576}
                alt={`Photo de ${location.name}`}
              />
              <div className={styles.filter}></div>
              <div className={styles.name}>
                <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
                <h3>{location.name}</h3>
              </div>
              <div className={styles.frequency}>
                <FontAwesomeIcon className={styles.icon} icon={faClock} />
                <p>{location.frequency}</p>
              </div>
              <div className={styles.schedule}>
                <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
                <p>{location.schedule}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

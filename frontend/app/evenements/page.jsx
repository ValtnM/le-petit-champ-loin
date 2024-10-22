import styles from "./evenements.module.scss";
import Image from "next/image";
import SwipperComponent from "../../components/SwiperEvents/SwiperEvents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";


export const metadata = {
  title: "Le Petit Champ Loin - Événements",
  description: "Le Petit Champ Loin se déplace sur les marchés pour vous proposez leurs produits",
};


export default async function evenements() {
  const eventRes = await fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/event/active", {
    method: "POST",
    cache: "no-store",
  });
  const events = await eventRes.json();

  const locationRes = await fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/location/active", {
    method: "POST",
    cache: "no-store",
  });
  const locations = await locationRes.json();

  return (
    <main className={styles.evenement}>
      {events.length > 0 && (
        <section>
          <h2>Événement à venir...</h2>
          <SwipperComponent events={events} />
        </section>
      )}

      {locations.length > 0 && (
        <section className={styles.locations}>
          <h2>Les marchés</h2>
          <div className={styles.articlesList}>
            {locations.map((location, index) => (
              <article key={index}>
                <Image
                  className={styles.photo}
                  src={`http://${process.env.NEXT_PUBLIC_IP_SERVER}:8080/api/images/${location.photo}`}
                  width={1024}
                  height={576}
                  alt={`Photo de ${location.name}`}
                />
                <div className={styles.filter}></div>
                <div className={styles.name}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faLocationDot}
                  />
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
          </div>
        </section>
      )}
    </main>
  );
}

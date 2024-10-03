import styles from "./evenements.module.scss";
// import Slider from "../../components/Slider/Slider";
import SwipperComponent from "../../components/Swiper/Swiper";

export default async function page() {
  const res = await fetch("http://localhost:8080/api/event/", {
    method: "POST",
  });

  const events = await res.json();
  // const locations = await fetch("http://localhost:8080/api/location/", {
  //     method: "POST",
  //   });
  // console.log(events);

  return (
    <main className={styles.evenement}>
      <section>
        <h2>Événement à venir...</h2>
        <SwipperComponent events={events}/>
        {/* {events && <Slider events={events} />} */}
      </section>
      <section>
        <h2>Les marchés</h2>
      </section>
    </main>
  );
}

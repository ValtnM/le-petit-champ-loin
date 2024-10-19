"use client";
import styles from "./evenements.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EventCard from "../../../components/EventCard/EventCard";
import ModalEvent from "../../../components/ModalEvent/ModalEvent";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function Events() {
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  const [events, setEvents] = useState([]);
  const [modalIsActive, setModalIsActive] = useState(false);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://" + process.env.IP_SERVER + ":8080/api/admin/checking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.isConnected) {
            router.push("/connexion");
          } else {
            getEvents();
            setReadyToRender(true);
          }
        });
    } else {
      router.push("/connexion");
    }
  }, [router]);

  const getEvents = () => {
    const token = localStorage.getItem("token");

    fetch("http://" + process.env.IP_SERVER + ":8080/api/event/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {readyToRender && (
        <main className={styles.events}>
          <BackBtn path="/admin" text="Tableau de bord" />
          <h2>Gestion des événements</h2>
          {events.length > 0 ? (
            <section className={styles.eventList}>
              <article
                onClick={() => setModalIsActive(true)}
                className={styles.addEvent}
              >
                <h3>Ajouter</h3>
                <FontAwesomeIcon
                  icon={faPlus}
                  className={styles.addEventIcon}
                />
              </article>
              {events.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </section>
          ) : (
            <p>Aucun événement trouvé</p>
          )}
          {modalIsActive && (
            <ModalEvent
              setIsActive={setModalIsActive}
              getEvents={getEvents}
            />
          )}
        </main>
      )}
    </>
  );
}

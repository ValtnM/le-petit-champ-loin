"use client";
import styles from "./lieux.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LocationCard from "../../../components/LocationCard/LocationCard";
import ModalLocation from "../../../components/ModalLocation/ModalLocation";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  const [locations, setLocations] = useState([]);
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
            getLocations();
            setReadyToRender(true);
          }
        });
    } else {
      router.push("/connexion");
    }
  }, [router]);

  const getLocations = () => {
    const token = localStorage.getItem("token");

    fetch("http://" + process.env.IP_SERVER + ":8080/api/location/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {readyToRender && (
        <main className={styles.locations}>
          <BackBtn path="/admin" text="Tableau de bord" />
          <h2>Gestion des lieux</h2>
          {locations.length > 0 ? (
            <section className={styles.locationList}>
              <button
                onClick={() => setModalIsActive(true)}
                className={styles.addLocation}
              >
                <h3>Ajouter</h3>
                <FontAwesomeIcon
                  icon={faPlus}
                  className={styles.addLocationIcon}
                />
              </button>
              {locations.map((location, index) => (
                <LocationCard key={index} location={location} />
              ))}
            </section>
          ) : (
            <p>Aucun lieu trouvé</p>
          )}
          {modalIsActive && (
            <ModalLocation
              setIsActive={setModalIsActive}
              getLocations={getLocations}
            />
          )}
        </main>
      )}
    </>
  );
}

"use client";
import styles from "./lieu.module.scss";
import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import BackBtn from "../../../../components/BackBtn/BackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  const [locationId, setLocationId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationFrequency, setLocationFrequency] = useState("");
  const [locationSchedule, setLocationSchedule] = useState("");
  const [locationIsActive, setLocationIsActive] = useState(false);
  const [locationPhoto, setLocationPhoto] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/api/admin/checking", {
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
            getLocationDetails(params.lieu);
            setReadyToRender(true);
          }
        });
    } else {
      router.push("/connexion");
    }
  }, [router, params]);

  const getLocationDetails = (locationId) => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/location/details", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: locationId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);

          setLocationId(data.id);
          setLocationName(data.name);
          // setLocationPassword(data.password);
          setLocationFrequency(data.frequency);
          setLocationSchedule(data.schedule);
          setLocationIsActive(data.isActive);
          setLocationPhoto(data.photo);
        }
      })
      .catch((error) => console.log(error));
  };

  const modifyLocation = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/location/modify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: locationId,
        name: locationName,
        frequency: locationFrequency,
        schedule: locationSchedule,
        isActive: locationIsActive,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotificationMessage(data.success);
        } else if (data.error) {
          setNotificationMessage(data.error);
        } else if (data.errors) {
          setNotificationMessage(data.errors[0].msg);
        }
      })
      .catch((error) => console.log(error));
  };

  const clickFileInput = (e) => {
    e.preventDefault();
    document.getElementById("uploadFile").click();
  };

  const modifyPhoto = (e) => {
    if (e.target.files) {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("id", locationId);
      formData.append("photo", e.target.files[0]);

      fetch("http://localhost:8080/api/location/modify-photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          getLocationDetails(locationId);
          if(data.error) {
            setNotificationMessage(data.error)
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const deleteLocation = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/location/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: locationId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/admin/lieux/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {readyToRender && (
        <main className={styles.location}>
          <BackBtn path="/admin/lieux" text="Gestion des lieux" />
          <form onSubmit={modifyLocation} className={styles.locationDetails}>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
            <input
              type="text"
              value={locationFrequency}
              onChange={(e) => setLocationFrequency(e.target.value)}
            />
            <input
              type="text"
              value={locationSchedule}
              onChange={(e) => setLocationSchedule(e.target.value)}
            />

            <div className={styles.modifyLocationCheckbox}>
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={locationIsActive}
                onChange={(e) => setLocationIsActive(e.target.checked)}
              />
              <label htmlFor="isActive">Actif</label>
            </div>

            {locationPhoto && (
              <Image
                className={styles.photo}
                src={`http://localhost:8080/api/images/${locationPhoto}`}
                width={400}
                height={400}
                alt={`Photo de ${locationName}`}
              />
            )}
            <div className={styles.modifyPhotoBtn}>
              <input onChange={modifyPhoto} type="file" id="uploadFile" />
              <button onClick={(e) => clickFileInput(e)}>
                <FontAwesomeIcon icon={faPlus} className={styles.addIcon} />
                Modifier la photo
              </button>
            </div>
            {notificationMessage && (
              <p className={styles.notificationMessage}>
                {notificationMessage}
              </p>
            )}
            <button className={styles.saveLocationBtn} type="submit">
              Enregistrer les modifications
            </button>
            <button
              onClick={deleteLocation}
              className={styles.deleteLocationBtn}
            >
              Supprimer le membre
            </button>
          </form>
        </main>
      )}
    </>
  );
}

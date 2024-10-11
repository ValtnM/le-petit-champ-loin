"use client";
import styles from "./lieu.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import BackBtn from "../../../../components/BackBtn/BackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  const [locationId, setLocationId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationFrequency, setLocationFrequency] = useState("");
  const [locationSchedule, setLocationSchedule] = useState("");
  const [locationIsActive, setLocationIsActive] = useState(false);
  const [locationPhoto, setLocationPhoto] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    console.log("params", params);
    
    getLocationDetails(params.lieu);
  }, [params]);

  const getLocationDetails = (locationId) => {
    fetch("http://localhost:8080/api/location/details", {
      method: "POST",
      headers: {
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

    
    fetch("http://localhost:8080/api/location/modify", {
      method: "POST",
      headers: {
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
        if(data.success) {
          setNotificationMessage(data.success);
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
      const formData = new FormData();
      formData.append("id", locationId);
      formData.append("photo", e.target.files[0], `${locationName}.jpg`);

      fetch("http://localhost:8080/api/location/modify-photo", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          getLocationDetails(locationId);
        })
        .catch((error) => console.log(error));
    }
  };


  const deleteLocation = () => {
    fetch("http://localhost:8080/api/location/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          <p className={styles.notificationMessage}>{notificationMessage}</p>
        )}
        <button className={styles.saveLocationBtn} type="submit">
          Enregistrer les modifications
        </button>
        <button onClick={deleteLocation} className={styles.deleteLocationBtn}>
          Supprimer le membre
        </button>
      </form>
    </main>
  );
}

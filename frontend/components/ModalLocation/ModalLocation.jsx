"use client";
import styles from "./ModalLocation.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ModalLocation({ setIsActive, getLocations }) {
  // form state
  const [newLocationName, setNewLocationName] = useState("");
  const [newLocationFrequency, setNewLocationFrequency] = useState("");
  const [newLocationSchedule, setNewLocationSchedule] = useState("");
  const [newLocationIsActive, setNewLocationIsActive] = useState(false);
  const [newLocationFile, setNewLocationFile] = useState(null);
  const [newLocationPreviewImage, setNewLocationPreviewImage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Send request to API
  const addLocation = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append("name", newLocationName);
    formData.append("frequency", newLocationFrequency);
    formData.append("schedule", newLocationSchedule);
    formData.append("isActive", newLocationIsActive);
    formData.append("photo", newLocationFile, `${newLocationName}.jpg`);
    fetch("http://localhost:8080/api/location/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setNotificationMessage(data.success);
          clearForm();
          getLocations();
        } else if (data.error) {
          setNotificationMessage(data.error);
        }
      });
  };

  useEffect(() => {
    let previewImage = "";
    if (newLocationFile instanceof File) {
      previewImage = URL.createObjectURL(newLocationFile);
    }
    setNewLocationPreviewImage(previewImage);

    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [newLocationFile]);


  const clickFileInput = (e) => {
    e.preventDefault();
    document.getElementById("uploadFile").click();
  };

  const handleInputFile = (e) => {    
    setNewLocationFile(e.target.files[0]);
  };



  const clearForm = () => {
    setNewLocationName("");
    setNewLocationFrequency("");
    setNewLocationSchedule("");
    setNewLocationFile(null);
    setNewLocationPreviewImage("");
    setNewLocationIsActive(false);
  };

  return (
    <section className={styles.modalLocation}>
      <div className={styles.container}>
        <FontAwesomeIcon
          onClick={() => setIsActive(false)}
          icon={faCircleXmark}
          className={styles.closeModal}
        />

        <h2>Ajout d'un lieu</h2>
        <form onSubmit={(e) => addLocation(e)}>
          <div className={styles.field}>
            <label htmlFor="name">Nom</label>
            <input
              onChange={(e) => setNewLocationName(e.target.value)}
              type="text"
              id="name"
              value={newLocationName}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="frequency">Fréquence</label>
            <input
              onChange={(e) => setNewLocationFrequency(e.target.value)}
              type="text"
              id="frequency"
              value={newLocationFrequency}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="schedule">Horaires</label>
            <input
              onChange={(e) => setNewLocationSchedule(e.target.value)}
              type="text"
              id="schedule"
              value={newLocationSchedule}
              required
            />
          </div>
          
          <div className={styles.uploadBtn}>
            <input onChange={handleInputFile} type="file" id="uploadFile" required />
            <button onClick={(e) => clickFileInput(e)}>
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
              Ajouter une photo
            </button>
          </div>
          {newLocationPreviewImage && (
            <div className={styles.locationCreationPreview}>
              
              <Image
                className={styles.locationCreationPreviewImage}
                src={newLocationPreviewImage}
                width={400}
                height={300}
                alt="Photo ajoutée"
              />
            </div>
          )}
          <div className={styles.locationCreationCheckbox}>
            <input
              onChange={(e) => setNewLocationIsActive(e.target.checked)}
              type="checkbox"
              id="newLocationActive"
              name="newLocationActive"
              value={newLocationIsActive}
            />
            <label htmlFor="newLocationActive">Actif</label>
          </div>
          
          <button type="submit" className={styles.locationCreationButton}>
            Créer
          </button>
          {notificationMessage && <div>{notificationMessage}</div>}
        </form>
      </div>
    </section>
  );
}

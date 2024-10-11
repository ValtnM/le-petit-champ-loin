"use client";
import styles from "./ModalArticle.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ModalArticle({ setIsActive, getArticles }) {
  // form state
  const [newArticleName, setNewArticleName] = useState("");
  const [newArticleFrequency, setNewArticleFrequency] = useState("");
  const [newArticleSchedule, setNewArticleSchedule] = useState("");
  const [newArticleIsActive, setNewArticleIsActive] = useState(false);
  const [newArticleFile, setNewArticleFile] = useState(null);
  const [newArticlePreviewImage, setNewArticlePreviewImage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Send request to API
  const addArticle = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newArticleName);
    formData.append("frequency", newArticleFrequency);
    formData.append("schedule", newArticleSchedule);
    formData.append("isActive", newArticleIsActive);
    formData.append("photo", newArticleFile, `${newArticleName}.jpg`);
    fetch("http://localhost:8080/api/article/add", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setNotificationMessage(data.success);
          clearForm();
          getArticles();
        } else if (data.error) {
          setNotificationMessage(data.error);
        }
      });
  };

  useEffect(() => {
    let previewImage = "";
    if (newArticleFile instanceof File) {
      previewImage = URL.createObjectURL(newArticleFile);
    }
    setNewArticlePreviewImage(previewImage);

    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [newArticleFile]);


  const clickFileInput = (e) => {
    e.preventDefault();
    document.getElementById("uploadFile").click();
  };

  const handleInputFile = (e) => {    
    setNewArticleFile(e.target.files[0]);
  };



  const clearForm = () => {
    setNewArticleName("");
    setNewArticleFrequency("");
    setNewArticleSchedule("");
    setNewArticleFile(null);
    setNewArticlePreviewImage("");
    setNewArticleIsActive(false);
  };

  return (
    <section className={styles.modalArticle}>
      <div className={styles.container}>
        <FontAwesomeIcon
          onClick={() => setIsActive(false)}
          icon={faCircleXmark}
          className={styles.closeModal}
        />

        <h2>Ajout d'un lieu</h2>
        <form onSubmit={(e) => addArticle(e)}>
          <div className={styles.field}>
            <label htmlFor="name">Nom</label>
            <input
              onChange={(e) => setNewArticleName(e.target.value)}
              type="text"
              id="name"
              value={newArticleName}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="frequency">Fréquence</label>
            <input
              onChange={(e) => setNewArticleFrequency(e.target.value)}
              type="text"
              id="frequency"
              value={newArticleFrequency}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="schedule">Horaires</label>
            <input
              onChange={(e) => setNewArticleSchedule(e.target.value)}
              type="text"
              id="schedule"
              value={newArticleSchedule}
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
          {newArticlePreviewImage && (
            <div className={styles.articleCreationPreview}>
              
              <Image
                className={styles.articleCreationPreviewImage}
                src={newArticlePreviewImage}
                width={400}
                height={300}
                alt="Photo ajoutée"
              />
            </div>
          )}
          <div className={styles.articleCreationCheckbox}>
            <input
              onChange={(e) => setNewArticleIsActive(e.target.checked)}
              type="checkbox"
              id="newArticleActive"
              name="newArticleActive"
              value={newArticleIsActive}
            />
            <label htmlFor="newArticleActive">Actif</label>
          </div>
          
          <button type="submit" className={styles.articleCreationButton}>
            Créer
          </button>
          {notificationMessage && <div>{notificationMessage}</div>}
        </form>
      </div>
    </section>
  );
}

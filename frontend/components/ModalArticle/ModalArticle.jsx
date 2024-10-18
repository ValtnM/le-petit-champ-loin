"use client";
import styles from "./ModalArticle.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ModalArticle({ setIsActive, getArticles }) {
  // form state
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleContent, setNewArticleContent] = useState("");
  const [newArticleIsActive, setNewArticleIsActive] = useState(false);
  const [newArticleFile, setNewArticleFile] = useState(null);
  const [newArticlePreviewImage, setNewArticlePreviewImage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Send request to API
  const addArticle = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", newArticleTitle);
    formData.append("content", newArticleContent);
    formData.append("isActive", newArticleIsActive);
    formData.append("photo", newArticleFile);
    fetch("http://localhost:8080/api/article/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotificationMessage(data.success);
          clearForm();
          getArticles();
        } else if (data.error) {
          setNotificationMessage(data.error);
        } else if (data.errors) {
          setNotificationMessage(data.errors[0].msg);
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
    setNewArticleTitle("");
    setNewArticleContent("");
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

        <h2>Ajout d&apos;un article</h2>
        <form onSubmit={(e) => addArticle(e)}>
          <div className={styles.field}>
            <label htmlFor="name">Titre</label>
            <input
              onChange={(e) => setNewArticleTitle(e.target.value)}
              type="text"
              id="title"
              value={newArticleTitle}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="content">Texte</label>
            <textarea
              onChange={(e) => setNewArticleContent(e.target.value)}
              name="content"
              id="content"
              rows={20}
              value={newArticleContent}
            ></textarea>
          </div>

          <div className={styles.uploadBtn}>
            <input onChange={handleInputFile} type="file" id="uploadFile" />
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

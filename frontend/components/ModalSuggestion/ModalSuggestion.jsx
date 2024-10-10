"use client";
import styles from "./ModalSuggestion.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ModalSuggestion({ setIsActive, getSuggestions }) {
  // form state
  const [newSuggestionTitle, setNewSuggestionTitle] = useState("");
  const [newSuggestionDescription, setNewSuggestionDescription] = useState("");
  const [newSuggestionIsActive, setNewSuggestionIsActive] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Send request to API
  const addSuggestion = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newSuggestionTitle);
    formData.append("description", newSuggestionDescription);
    formData.append("isActive", newSuggestionIsActive);
    fetch("http://localhost:8080/api/suggestion/add", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setNotificationMessage(data.success);
          clearForm();
          getSuggestions();
        } else if (data.error) {
          setNotificationMessage(data.error);
        }
      });
  };

  const clearForm = () => {
    setNewSuggestionTitle("");
    setNewSuggestionDescription("");
    setNewSuggestionIsActive(false);
  };

  return (
    <section className={styles.modalSuggestion}>
      <div className={styles.container}>
        <FontAwesomeIcon
          onClick={() => setIsActive(false)}
          icon={faCircleXmark}
          className={styles.closeModal}
        />

        <h2>Ajout d'une suggestion</h2>
        <form onSubmit={(e) => addSuggestion(e)}>
          <div className={styles.field}>
            <label htmlFor="name">Title</label>
            <input
              onChange={(e) => setNewSuggestionTitle(e.target.value)}
              type="text"
              id="name"
              value={newSuggestionTitle}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description</label>
            <textarea
              onChange={(e) => setNewSuggestionDescription(e.target.value)}
              name="description"
              id="description"
              rows={20}
              value={newSuggestionDescription}
              required
            ></textarea>
          </div>

          <div className={styles.suggestionCreationCheckbox}>
            <input
              onChange={(e) => setNewSuggestionIsActive(e.target.checked)}
              type="checkbox"
              id="newSuggestionActive"
              name="newSuggestionActive"
              value={newSuggestionIsActive}
            />
            <label htmlFor="newSuggestionActive">Actif</label>
          </div>

          <button type="submit" className={styles.suggestionCreationButton}>
            Créer
          </button>
          {notificationMessage && <div>{notificationMessage}</div>}
        </form>
      </div>
    </section>
  );
}

"use client";
import styles from "./suggestion.module.scss";
import { useEffect, useState } from "react";
import BackBtn from "../../../../components/BackBtn/BackBtn";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  const [suggestionId, setSuggestionId] = useState("");
  const [suggestionTitle, setSuggestionTitle] = useState("");
  const [suggestionDescription, setSuggestionDescription] = useState("");
  const [suggestionIsActive, setSuggestionIsActive] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    getSuggestionDetails(params.suggestion);
  }, [params]);

  const getSuggestionDetails = (suggestionId) => {
    fetch("http://localhost:8080/api/suggestion/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: suggestionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);

          setSuggestionId(data.id);
          setSuggestionTitle(data.title);
          setSuggestionDescription(data.description);
          setSuggestionIsActive(data.isActive);
        }
      })
      .catch((error) => console.log(error));
  };

  const modifySuggestion = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/suggestion/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: suggestionId,
        title: suggestionTitle,
        description: suggestionDescription,
        isActive: suggestionIsActive,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setNotificationMessage(data.success);
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteSuggestion = () => {
    fetch("http://localhost:8080/api/suggestion/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: suggestionId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/admin/suggestions/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className={styles.suggestion}>
      <BackBtn path="/admin/suggestions" text="Gestion des suggestions" />
      <form onSubmit={modifySuggestion} className={styles.suggestionDetails}>
        <input
          type="text"
          value={suggestionTitle}
          onChange={(e) => setSuggestionTitle(e.target.value)}
        />

        <textarea
          name=""
          id=""
          value={suggestionDescription}
          rows={20}
          onChange={(e) => setSuggestionDescription(e.target.value)}
        ></textarea>
        <div className={styles.modifySuggestionCheckbox}>
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={suggestionIsActive}
            onChange={(e) => setSuggestionIsActive(e.target.checked)}
          />
          <label htmlFor="isActive">Actif</label>
        </div>

        {notificationMessage && (
          <p className={styles.notificationMessage}>{notificationMessage}</p>
        )}
        <button className={styles.saveSuggestionBtn} type="submit">
          Enregistrer les modifications
        </button>
        <button
          onClick={deleteSuggestion}
          className={styles.deleteSuggestionBtn}
        >
          Supprimer le membre
        </button>
      </form>
    </main>
  );
}

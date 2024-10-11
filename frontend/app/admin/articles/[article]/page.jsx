"use client";
import styles from "./article.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import BackBtn from "../../../../components/BackBtn/BackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  const [articleId, setArticleId] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleIsActive, setArticleIsActive] = useState(false);
  const [articlePhoto, setArticlePhoto] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    console.log("params", params);
    
    getArticleDetails(params.article);
  }, [params]);

  const getArticleDetails = (articleId) => {
    fetch("http://localhost:8080/api/article/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: articleId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setArticleId(data.id);
          setArticleTitle(data.title);
          setArticleContent(data.content);
          setArticleIsActive(data.isActive);
          setArticlePhoto(data.photo);
        }
      })
      .catch((error) => console.log(error));
  };

  const modifyArticle = (e) => {
    e.preventDefault();

    
    fetch("http://localhost:8080/api/article/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: articleId,
        title: articleTitle,
        content: articleContent,
        isActive: articleIsActive,
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
      formData.append("id", articleId);
      formData.append("photo", e.target.files[0], `${articleTitle}.jpg`);

      fetch("http://localhost:8080/api/article/modify-photo", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          getArticleDetails(articleId);
        })
        .catch((error) => console.log(error));
    }
  };


  const deleteArticle = () => {
    fetch("http://localhost:8080/api/article/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: articleId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/admin/articles/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className={styles.article}>
      <BackBtn path="/admin/articles" text="Gestion des articles" />
      <form onSubmit={modifyArticle} className={styles.articleDetails}>
        <input
          type="text"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
        />
        <textarea
          name="content"
          id="content"
          value={articleContent}
          rows={20}
          onChange={(e) => setArticleContent(e.target.value)}
        ></textarea>
        
        <div className={styles.modifyArticleCheckbox}>
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={articleIsActive}
            onChange={(e) => setArticleIsActive(e.target.checked)}
          />
          <label htmlFor="isActive">Actif</label>
        </div>
        
        {articlePhoto && (
          <Image
            className={styles.photo}
            src={`http://localhost:8080/api/images/${articlePhoto}`}
            width={400}
            height={400}
            alt={`Photo de ${articleTitle}`}
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
        <button className={styles.saveArticleBtn} type="submit">
          Enregistrer les modifications
        </button>
        <button onClick={deleteArticle} className={styles.deleteArticleBtn}>
          Supprimer l'article
        </button>
      </form>
    </main>
  );
}

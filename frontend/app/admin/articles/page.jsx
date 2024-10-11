"use client";
import styles from "./articles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ArticleCard from "../../../components/ArticleCard/ArticleCard";
import ModalArticle from "../../../components/ModalArticle/ModalArticle";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { useState, useEffect } from "react";

export default function Page() {
  const [articles, setArticles] = useState([]);
  const [modalIsActive, setModalIsActive] = useState(false);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () => {
    fetch("http://localhost:8080/api/article/", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error(error));
  };

  return (
    <main className={styles.articles}>
      <BackBtn path="/admin" text="Tableau de bord" />
      <h2>Gestion des articles</h2>
      {articles.length > 0 ? (
        <section className={styles.articleList}>
          <button
            onClick={() => setModalIsActive(true)}
            className={styles.addArticle}
          >
            <h3>Ajouter</h3>
            <FontAwesomeIcon icon={faPlus} className={styles.addArticleIcon} />
          </button>
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </section>
      ) : (
        <p>Aucun article trouvé</p>
      )}
      {modalIsActive && (
        <ModalArticle
          setIsActive={setModalIsActive}
          getArticles={getArticles}
        />
      )}
    </main>
  );
}

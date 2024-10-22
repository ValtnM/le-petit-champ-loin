"use client";
import styles from "./articles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ArticleCard from "../../../components/ArticleCard/ArticleCard";
import ModalArticle from "../../../components/ModalArticle/ModalArticle";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function Articles() {
  document.title = "Le Petit Champ Loin - Gestion des articles";
  const router = useRouter();

  const [articles, setArticles] = useState([]);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [readyToRender, setReadyToRender] = useState(false);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/admin/checking", {
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
            getArticles();
            setReadyToRender(true);
          }
        });
    } else {
      router.push("/connexion");
    }
  }, [router]);


  const getArticles = () => {
    const token = localStorage.getItem("token");

    fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/article/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReadyToRender(true);
        setArticles(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {readyToRender && (
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
                <FontAwesomeIcon
                  icon={faPlus}
                  className={styles.addArticleIcon}
                />
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
      )}
    </>
  );
}

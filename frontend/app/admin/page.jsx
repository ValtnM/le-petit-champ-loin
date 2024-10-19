"use client";

import styles from "./admin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faNewspaper,
  faCalendar,
  faUsers,
  faLocationDot,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";

export default function Page() {
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  const [nbProducts, setNbProducts] = useState(0);
  const [nbActiveProducts, setNbActiveProducts] = useState(0);
  const [nbMembers, setNbMembers] = useState(0);
  const [nbActiveMembers, setNbActiveMembers] = useState(0);
  const [nbEvents, setNbEvents] = useState(0);
  const [nbActiveEvents, setNbActiveEvents] = useState(0);
  const [nbLocations, setNbLocations] = useState(0);
  const [nbActiveLocations, setNbActiveLocations] = useState(0);
  const [nbSuggestions, setNbSuggestions] = useState(0);
  const [nbActiveSuggestions, setNbActiveSuggestions] = useState(0);
  const [nbArticles, setNbArticles] = useState(0);
  const [nbActiveArticles, setNbActiveArticles] = useState(0);


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
            getAllElements();
            setReadyToRender(true);
          }
        });
    } else {
      router.push("/connexion");
    }
  }, [router]);

  const getAllElements = () => {
    const token = localStorage.getItem("token");

    fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/admin/dashboard", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setReadyToRender(true);
          setNbProducts(data.nbProducts);
          setNbActiveProducts(data.nbActiveProducts);
          setNbMembers(data.nbMembers);
          setNbActiveMembers(data.nbActiveMembers);
          setNbEvents(data.nbEvents);
          setNbActiveEvents(data.nbActiveEvents);
          setNbLocations(data.nbLocations);
          setNbActiveLocations(data.nbActiveLocations);
          setNbSuggestions(data.nbSuggestions);
          setNbActiveSuggestions(data.nbActiveSuggestions);
          setNbArticles(data.nbArticles);
          setNbActiveArticles(data.nbActiveArticles);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {readyToRender && (
        <main className={styles.admin}>
          <h2>Tableau de bord</h2>
          <section>
            <article>
              <Link href="/admin/produits">
                <div className={styles.title}>
                  <FontAwesomeIcon
                    icon={faBasketShopping}
                    className={styles.linkIcon}
                  />
                  <h3>Produits</h3>
                </div>
                <div className={styles.numberOfElement}>
                  <div className={styles.activeElements}>
                    <p>Actifs</p>
                    <p>{nbActiveProducts}</p>
                  </div>
                  <div className={styles.totalElements}>
                    <p>Total</p>
                    <p>{nbProducts}</p>
                  </div>
                </div>
              </Link>
            </article>
            <article>
              <Link href="/admin/membres">
                <div className={styles.title}>
                  <FontAwesomeIcon icon={faUsers} className={styles.linkIcon} />
                  <h3>Membres</h3>
                </div>
                <div className={styles.numberOfElement}>
                  <div className={styles.activeElements}>
                    <p>Actifs</p>
                    <p>{nbActiveMembers}</p>
                  </div>
                  <div className={styles.totalElements}>
                    <p>Nombre</p>
                    <p>{nbMembers}</p>
                  </div>
                </div>
              </Link>
            </article>
            <article>
              <Link href="/admin/evenements">
                <div className={styles.title}>
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className={styles.linkIcon}
                  />
                  <h3>Événements</h3>
                </div>
                <div className={styles.numberOfElement}>
                  <div className={styles.activeElements}>
                    <p>Actifs</p>
                    <p>{nbActiveEvents}</p>
                  </div>
                  <div className={styles.totalElements}>
                    <p>Total</p>
                    <p>{nbEvents}</p>
                  </div>
                </div>
              </Link>
            </article>
            <article>
              <Link href="/admin/lieux">
                <div className={styles.title}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.linkIcon}
                  />
                  <h3>Lieux</h3>
                </div>
                <div className={styles.numberOfElement}>
                  <div className={styles.activeElements}>
                    <p>Actifs</p>
                    <p>{nbActiveLocations}</p>
                  </div>
                  <div className={styles.totalElements}>
                    <p>Total</p>
                    <p>{nbLocations}</p>
                  </div>
                </div>
              </Link>
            </article>
            <article>
              <Link href="/admin/suggestions">
                <div className={styles.title}>
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className={styles.linkIcon}
                  />
                  <h3>Suggestions</h3>
                </div>
                <div className={styles.numberOfElement}>
                  <div className={styles.activeElements}>
                    <p>Actifs</p>
                    <p>{nbActiveSuggestions}</p>
                  </div>
                  <div className={styles.totalElements}>
                    <p>Total</p>
                    <p>{nbSuggestions}</p>
                  </div>
                </div>
              </Link>
            </article>
            <article>
              <Link href="/admin/articles">
                <div className={styles.title}>
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    className={styles.linkIcon}
                  />
                  <h3>Articles</h3>
                </div>
                <div className={styles.numberOfElement}>
                  <div className={styles.activeElements}>
                    <p>Actifs</p>
                    <p>{nbActiveArticles}</p>
                  </div>
                  <div className={styles.totalElements}>
                    <p>Total</p>
                    <p>{nbArticles}</p>
                  </div>
                </div>
              </Link>
            </article>
          </section>
        </main>
      )}
    </>
  );
}

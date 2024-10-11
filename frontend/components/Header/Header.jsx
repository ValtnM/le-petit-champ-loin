"use client";

import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleXmark,
  faHouse,
  faUsers,
  faBasketShopping,
  faCalendar,
  faNewspaper,
  faEnvelope,
  faEye,
  faUtensils,
  faLocationDot,
  faLock,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { StateContext } from "../../utils/context";

export default function Header() {

  const {isConnected, setIsConnected} = useContext(StateContext);

  const pathname = usePathname();
  useEffect(() => {
    checkConnexion();
  }, []);
  useEffect(() => {
    console.log(isConnected);
    
  }, [isConnected]);

  useEffect(() => {
    setActiveNav(false);
  }, [pathname]);

  const [activeNav, setActiveNav] = useState(false);
  // const [connected, setConnected] = useState(false);

  const checkConnexion = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/api/admin/checking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => setIsConnected(data.isConnected));
    } else {
      setIsConnected(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftHeader}>
        <Image
          className={styles.logo}
          src="/img/logo.png"
          width={100}
          height={100}
          alt="Logo le petit champ loin"
        />
        <h1>Le Petit Champ Loin</h1>
      </div>
      {activeNav ? (
        <FontAwesomeIcon
          onClick={() => setActiveNav(false)}
          className={`${styles.navIcon} ${styles.closeModal}`}
          icon={faCircleXmark}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => setActiveNav(true)}
          className={styles.navIcon}
          icon={faBars}
        />
      )}
      <nav className={activeNav ? `${styles.activeNav}` : ""}>
        <ul>
          <li>
            <Link
              href="/"
              className={
                pathname === "/"
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
            >
              <FontAwesomeIcon icon={faHouse} className={styles.linkIcon} />
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/equipe"
              className={
                pathname === "/equipe"
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
            >
              <FontAwesomeIcon icon={faUsers} className={styles.linkIcon} />
              Équipe
            </Link>
          </li>
          <li>
            <Link
              href="/produits"
              className={
                pathname === "/produits"
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
            >
              <FontAwesomeIcon
                icon={faBasketShopping}
                className={styles.linkIcon}
              />
              Produits
            </Link>
          </li>
          <li>
            <Link
              href="/evenements"
              className={
                pathname === "/evenements"
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
            >
              <FontAwesomeIcon icon={faCalendar} className={styles.linkIcon} />
              Événements
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={
                pathname === "/blog"
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
            >
              <FontAwesomeIcon icon={faNewspaper} className={styles.linkIcon} />
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={
                pathname === "/contact"
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
            >
              <FontAwesomeIcon icon={faEnvelope} className={styles.linkIcon} />
              Contact
            </Link>
          </li>
          <span>Gestion</span>
          <hr />
          {!isConnected && (
            <li>
              <Link
                href="/connexion"
                className={
                  pathname === "/connexion"
                    ? `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                }
              >
                <FontAwesomeIcon icon={faLock} className={styles.linkIcon} />
                Connexion
              </Link>
            </li>
          )}
          {isConnected && (
            <div>
              <li>
                <Link
                  href="/admin"
                  className={
                    pathname === "/admin"
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : styles.navLink
                  }
                >
                  <FontAwesomeIcon icon={faEye} className={styles.linkIcon} />
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/produits"
                  className={
                    pathname === "/admin/produits"
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : styles.navLink
                  }
                >
                  <FontAwesomeIcon icon={faUsers} className={styles.linkIcon} />
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/membres"
                  className={
                    pathname === "/admin/membres"
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : styles.navLink
                  }
                >
                  <FontAwesomeIcon icon={faUsers} className={styles.linkIcon} />
                  Membres
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/suggestions"
                  className={
                    pathname === "/admin/suggestions"
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : styles.navLink
                  }
                >
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className={styles.linkIcon}
                  />
                  Suggestions
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/evenements"
                  className={
                    pathname === "/admin/evenements"
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : styles.navLink
                  }
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className={styles.linkIcon}
                  />
                  Événements
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/lieux"
                  className={
                    pathname === "/admin/lieux"
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : styles.navLink
                  }
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.linkIcon}
                  />
                  Lieux
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/articles"
                  className={
                    pathname === "/admin/articles"
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : styles.navLink
                  }
                >
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    className={styles.linkIcon}
                  />
                  Articles
                </Link>
              </li>
              <li onClick={logout}>
                <a className={styles.navLink} href="#">
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className={styles.linkIcon}
                  />
                  Déconnexion
                </a>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

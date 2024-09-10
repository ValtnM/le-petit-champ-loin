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
  faLock
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  useEffect(() => {
    setActiveNav(false);
  }, [pathname]);

  const [activeNav, setActiveNav] = useState(false);
  const [connected, setConnected] = useState(false);

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
      {activeNav ? 
      <FontAwesomeIcon
        onClick={() => setActiveNav(false)}
        className={`${styles.navIcon} ${styles.closeModal}`}
        icon={faCircleXmark}
      />
      :
      <FontAwesomeIcon
      onClick={() => setActiveNav(true)}
      className={styles.navIcon}
      icon={faBars}
      />
       }
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
          <span>
            Gestion
          </span>
          <hr />
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
          <li>
            <Link
              href="/tableau-de-bord"
              className={
                pathname === "/tableau-de-bord"
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
              href="/membres"
              className={
                pathname === "/membres"
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
              href="/suggestions"
              className={
                pathname === "/suggestions"
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
            >
              <FontAwesomeIcon icon={faUtensils} className={styles.linkIcon} />
              Suggestions
            </Link>
          </li>
          <li>
            <Link
              href="/evenements-gestion"
              className={
                pathname === "/evenements-gestion"
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
              href="/lieux"
              className={
                pathname === "/lieux"
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
              href="/articles"
              className={
                pathname === "/articles"
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
            >
              <FontAwesomeIcon icon={faNewspaper} className={styles.linkIcon} />
              Articles
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

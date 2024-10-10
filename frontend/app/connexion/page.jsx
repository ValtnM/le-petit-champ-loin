"use client";
import styles from "./connexion.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
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
        .then((data) => {
          console.log(data);
          if (data.isConnected) {
            router.push("/admin");
          }
        });
    }
  }, []);

  const connection = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          router.push("/admin");
        }
        if (data.message) {
          setNotificationMessage(data.message);
        }
      });
  };

  return (
    <main className={styles.connexion}>
      <form onSubmit={connection}>
        <h2>Connexion</h2>
        <div className={styles.formField}>
          <label htmlFor="user">Identifiant</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="user"
            type="text"
            name="user"
            required
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="password">Mot de passe</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            name="password"
            required
          />
        </div>
        <input type="submit" value="Se connecter" />
        {notificationMessage && (
          <p className={styles.notificationMessage}>{notificationMessage}</p>
        )}
      </form>
    </main>
  );
}

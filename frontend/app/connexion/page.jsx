"use client";
import styles from "./connexion.module.scss";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function Connexion() {
  document.title = "Le Petit Champ Loin - Connexion";
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [notificationMessage, setNotificationMessage] = useState("");

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
          if (data.isConnected) {
            router.push("/admin");
          } else {
            setReadyToRender(true);
          }
        });
    } else {
      setReadyToRender(true);
    }
  }, []);

  const connection = (e) => {
    e.preventDefault();

    fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          router.push("/admin");
        }
        if (data.error) {
          setNotificationMessage(data.error);
        }  else if (data.errors) {
          setNotificationMessage(data.errors[0].msg);
        }
      });
  };

  return (
    <>
      {readyToRender && (
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
                
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="password">Mot de passe</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                name="password"
                
              />
            </div>
            <input type="submit" value="Se connecter" />
            {notificationMessage && (
              <p className={styles.notificationMessage}>
                {notificationMessage}
              </p>
            )}
          </form>
        </main>
      )}
    </>
  );
}

"use client";
import styles from "./ContactForm.module.scss";
import { useState } from "react";

export default function ContactForm() {
  const [gender, setGender] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gender,
        firstname,
        lastname,
        email,
        phone,
        subject,
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotificationMessage(data.success);
          clearForm();
        } else if (data.error) {
          setNotificationMessage(data.error);
        } else if (data.errors) {
          setNotificationMessage(data.errors[0].msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const clearForm = () => {
    setGender("");
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  return (
    <form className={styles.contactForm}>
      <div className={styles.gender}>
        <div className={styles.genderInput}>
          <input
            type="radio"
            id="woman"
            name="gender"
            value="Madame"
            onChange={handleGenderChange}
          />
          <label htmlFor="woman">Madame</label>
        </div>
        <div className={styles.genderInput}>
          <input
            type="radio"
            id="man"
            name="gender"
            value="Monsieur"
            onChange={handleGenderChange}
          />
          <label htmlFor="man">Monsieur</label>
        </div>
      </div>
      <div className={styles.firstnameInput}>
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className={styles.lastnameInput}>
        <label htmlFor="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className={styles.emailInput}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.phoneInput}>
        <label htmlFor="phone">Téléphone</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className={styles.subjectInput}>
        <label htmlFor="lastname">Objet</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className={styles.messageInput}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={sendMessage}>Envoyer</button>
      {notificationMessage && (
        <p className={styles.notificationMessage}>{notificationMessage}</p>
      )}
    </form>
  );
}

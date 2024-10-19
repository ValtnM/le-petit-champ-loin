"use client";
import styles from "./ModalMember.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ModalMember({ setIsActive, getMembers }) {
  // form state
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPassword, setNewMemberPassword] = useState("");
  const [newMemberPresentation, setNewMemberPresentation] = useState("");
  const [newMemberIsActive, setNewMemberIsActive] = useState(false);
  const [newMemberIsAdmin, setNewMemberIsAdmin] = useState(false);
  const [newMemberFile, setNewMemberFile] = useState(null);
  const [newMemberPreviewImage, setNewMemberPreviewImage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Send request to API
  const addMember = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", newMemberName);
    formData.append("email", newMemberEmail);
    formData.append("password", newMemberPassword);
    formData.append("presentation", newMemberPresentation);
    formData.append("isAdmin", newMemberIsAdmin);
    formData.append("isActive", newMemberIsActive);
    formData.append("photo", newMemberFile);
    fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/user/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotificationMessage(data.success);
          clearForm();
          getMembers(data.isAdmin, data.userId);
        } else if (data.error) {
          setNotificationMessage(data.error);
        } else if (data.errors) {
          setNotificationMessage(data.errors[0].msg);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let previewImage = "";
    if (newMemberFile instanceof File) {
      previewImage = URL.createObjectURL(newMemberFile);
    }
    setNewMemberPreviewImage(previewImage);

    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [newMemberFile]);

  const clickFileInput = (e) => {
    e.preventDefault();
    document.getElementById("uploadFile").click();
  };

  const handleInputFile = (e) => {
    setNewMemberFile(e.target.files[0]);
  };

  const clearForm = () => {
    setNewMemberName("");
    setNewMemberEmail("");
    setNewMemberPassword("");
    setNewMemberPresentation("");
    setNewMemberFile(null);
    setNewMemberPreviewImage("");
    setNewMemberIsActive(false);
  };

  return (
    <section className={styles.modalMember}>
      <div className={styles.container}>
        <FontAwesomeIcon
          onClick={() => setIsActive(false)}
          icon={faCircleXmark}
          className={styles.closeModal}
        />

        <h2>Ajout d&apos;un membre</h2>
        <form onSubmit={(e) => addMember(e)}>
          <div className={styles.field}>
            <label htmlFor="name">Prénom</label>
            <input
              onChange={(e) => setNewMemberName(e.target.value)}
              type="text"
              id="name"
              value={newMemberName}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setNewMemberEmail(e.target.value)}
              type="email"
              id="email"
              value={newMemberEmail}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Mot de passe</label>
            <input
              onChange={(e) => setNewMemberPassword(e.target.value)}
              type="text"
              id="password"
              value={newMemberPassword}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="presentation">Bio</label>
            <textarea
              onChange={(e) => setNewMemberPresentation(e.target.value)}
              name="presentation"
              id="presentation"
              rows={20}
              value={newMemberPresentation}
            ></textarea>
          </div>
          <div className={styles.uploadBtn}>
            <input onChange={handleInputFile} type="file" id="uploadFile" />
            <button onClick={(e) => clickFileInput(e)}>
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
              Ajouter une photo
            </button>
          </div>
          {newMemberPreviewImage && (
            <div className={styles.memberCreationPreview}>
              <Image
                className={styles.memberCreationPreviewImage}
                src={newMemberPreviewImage}
                width={400}
                height={300}
                alt="Photo ajoutée"
              />
            </div>
          )}
          <div className={styles.memberCreationCheckbox}>
            <input
              onChange={(e) => setNewMemberIsActive(e.target.checked)}
              type="checkbox"
              id="newMemberActive"
              name="newMemberActive"
              value={newMemberIsActive}
            />
            <label htmlFor="newMemberActive">Actif</label>
          </div>
          <div className={styles.memberCreationCheckbox}>
            <input
              onChange={(e) => setNewMemberIsAdmin(e.target.checked)}
              type="checkbox"
              id="newMemberAdmin"
              name="newMemberAdmin"
              value={newMemberIsAdmin}
            />
            <label htmlFor="newMemberAdmin">Admin</label>
          </div>
          <button type="submit" className={styles.memberCreationButton}>
            Créer
          </button>
          {notificationMessage && <div>{notificationMessage}</div>}
        </form>
      </div>
    </section>
  );
}

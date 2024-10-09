"use client";
import styles from "./membre.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import BackBtn from "../../../../components/BackBtn/BackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [memberPresentation, setMemberPresentation] = useState("");
  const [memberIsAdmin, setMemberIsAdmin] = useState(false);
  const [memberIsActive, setMemberIsActive] = useState(false);
  const [memberPhoto, setMemberPhoto] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    console.log("params", params);
    
    getMemberDetails(params.membre);
  }, [params]);

  const getMemberDetails = (memberId) => {
    fetch("http://localhost:8080/api/user/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: memberId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
            console.log(data);
            
          setMemberId(data.id);
          setMemberName(data.name);
          // setMemberPassword(data.password);
          setMemberEmail(data.email);
          setMemberPresentation(data.presentation);
          setMemberIsAdmin(data.isAdmin);
          setMemberIsActive(data.isActive);
          setMemberPhoto(data.photo);
        }
      })
      .catch((error) => console.log(error));
  };

  const modifyMember = (e) => {
    e.preventDefault();

    
    fetch("http://localhost:8080/api/user/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: memberId,
        name: memberName,
        email: memberEmail,
        password: memberPassword,
        presentation: memberPresentation,
        isActive: memberIsActive,
        isAdmin: memberIsAdmin,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.success) {
          setMemberPassword("");

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
      formData.append("id", memberId);
      formData.append("photo", e.target.files[0], `${memberName}.jpg`);

      fetch("http://localhost:8080/api/user/modify-photo", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          
          getMemberDetails(memberId);
        })
        .catch((error) => console.log(error));
    }
  };


  const deleteMember = () => {
    fetch("http://localhost:8080/api/user/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: memberId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/admin/membres/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className={styles.member}>
      <BackBtn path="/admin/membres" text="Gestion des membres" />
      <form onSubmit={modifyMember} className={styles.memberDetails}>
        <input
          type="text"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />
        <input
          type="text"
          value={memberEmail}
          onChange={(e) => setMemberEmail(e.target.value)}
        />
        <input
          type="text"
          value={memberPassword}
          onChange={(e) => setMemberPassword(e.target.value)}
          placeholder="Entrer un nouveau mot de passe"
        />

        <textarea
          name=""
          id=""
          value={memberPresentation}
          rows={20}
          onChange={(e) => setMemberPresentation(e.target.value)}
        ></textarea>
        <div className={styles.modifyMemberCheckbox}>
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={memberIsActive}
            onChange={(e) => setMemberIsActive(e.target.checked)}
          />
          <label htmlFor="isActive">Actif</label>
        </div>
        <div className={styles.modifyMemberCheckbox}>
          <input
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            checked={memberIsAdmin}
            onChange={(e) => setMemberIsAdmin(e.target.checked)}
          />
          <label htmlFor="isActive">Admin</label>
        </div>
        {memberPhoto && (
          <Image
            className={styles.photo}
            src={`http://localhost:8080/api/images/${memberPhoto}`}
            width={400}
            height={400}
            alt={`Photo de ${memberName}`}
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
        <button className={styles.saveMemberBtn} type="submit">
          Enregistrer les modifications
        </button>
        <button onClick={deleteMember} className={styles.deleteMemberBtn}>
          Supprimer le membre
        </button>
      </form>
    </main>
  );
}

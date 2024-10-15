"use client";
import styles from "./membres.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MemberCard from "../../../components/MemberCard/MemberCard";
import ModalMember from "../../../components/ModalMember/ModalMember";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  const [members, setMembers] = useState([]);
  const [modalIsActive, setModalIsActive] = useState(false);

  useLayoutEffect(() => {
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
          if (!data.isConnected) {
            router.push("/connexion");
          } else {
            getMembers();
            setReadyToRender(true);
          }
        });
    } else {
      router.push("/connexion");
    }
  }, [router]);

  const getMembers = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/user/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {readyToRender && (
        <main className={styles.members}>
          <BackBtn path="/admin" text="Tableau de bord" />
          <h2>Gestion des membres</h2>
          {members.length > 0 ? (
            <section className={styles.memberList}>
              <article
                onClick={() => setModalIsActive(true)}
                className={styles.addMember}
              >
                <h3>Ajouter</h3>
                <FontAwesomeIcon
                  icon={faPlus}
                  className={styles.addMemberIcon}
                />
              </article>
              {members.map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </section>
          ) : (
            <p>Aucun membre trouvé</p>
          )}
          {modalIsActive && (
            <ModalMember
              setIsActive={setModalIsActive}
              getMembers={getMembers}
            />
          )}
        </main>
      )}
    </>
  );
}

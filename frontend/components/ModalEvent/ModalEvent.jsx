"use client";
import styles from "./ModalEvent.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function ModalEvent({ setIsActive, getEvents }) {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // form state
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventSchedule, setNewEventSchedule] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [newEventIsActive, setNewEventIsActive] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    getMembers();
  }, []);
  useEffect(() => {
    console.log(selectedMembers);
  }, [selectedMembers]);

  const getMembers = () => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:8080/api/user/active", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => setMembers(data))
        .catch((err) => console.log(err));
    }
  };

  // Send request to API
  const addEvent = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:8080/api/event/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newEventTitle,
          date: newEventDate,
          schedule: newEventSchedule,
          location: newEventLocation,
          isActive: newEventIsActive,
          memberList: selectedMembers
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setNotificationMessage(data.success);
            clearForm();
            getEvents();
          } else if (data.error) {
            setNotificationMessage(data.error);
          }
        });
    }
  };

  const joinMember = (e) => {
    e.preventDefault();

    setSelectedMembers((selectedMembers) => [
      ...selectedMembers,
      members[selectedMember],
    ]);
  };

  const clearForm = () => {
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventSchedule("");
    setNewEventLocation("");
    setNewEventIsActive(false);
    setSelectedMembers([]);
    setSelectedMember(null);
  };

  const deleteMember = (index) => {
    setSelectedMembers((selectedMembers) => {
      let newArray = [...selectedMembers];
      newArray.splice(index, 1);
      console.log(newArray);

      return newArray;
    });
  };

  return (
    <section className={styles.modalEvent}>
      <div className={styles.container}>
        <FontAwesomeIcon
          onClick={() => setIsActive(false)}
          icon={faCircleXmark}
          className={styles.closeModal}
        />

        <h2>Ajout d'un événement</h2>
        <form onSubmit={(e) => addEvent(e)}>
          <div className={styles.field}>
            <label htmlFor="name">Titre</label>
            <input
              onChange={(e) => setNewEventTitle(e.target.value)}
              type="text"
              id="title"
              value={newEventTitle}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Date</label>
            <input
              onChange={(e) => setNewEventDate(e.target.value)}
              type="date"
              id="date"
              value={newEventDate}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Horaires</label>
            <input
              onChange={(e) => setNewEventSchedule(e.target.value)}
              type="text"
              id="schedule"
              value={newEventSchedule}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Lieu</label>
            <input
              onChange={(e) => setNewEventLocation(e.target.value)}
              type="text"
              id="location"
              value={newEventLocation}
              required
            />
          </div>
          <div className={styles.field}>
            <select
              onChange={(e) => setSelectedMember(e.target.value)}
              name="member"
              id="member"
            >
              <option value="">Sélectionner un membre à associer</option>
              {members.map((member, index) => (
                <option value={index} key={index}>
                  {member.name}
                </option>
              ))}
            </select>
            <button onClick={joinMember} className={styles.joinBtn}>
              <FontAwesomeIcon icon={faPlus} className={styles.joinIcon} />
              Associer
            </button>
          </div>
          {selectedMembers.length > 0 && (
            <div className={styles.membersThumbnails}>
              {selectedMembers.map((member, index) => (
                <div
                  onClick={() => deleteMember(index)}
                  className={styles.thumbnail}
                  key={index}
                >
                  <div className={styles.filter}></div>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.thumbnailIcon}
                  />

                  <Image
                    className={styles.photo}
                    src={`http://localhost:8080/api/images/${member.photo}`}
                    width={400}
                    height={400}
                    alt={`Photo de ${member.name}`}
                  />
                </div>
              ))}
            </div>
          )}

          <div className={styles.eventCreationCheckbox}>
            <input
              onChange={(e) => setNewEventIsActive(e.target.checked)}
              type="checkbox"
              id="newEventActive"
              name="newEventActive"
              value={newEventIsActive}
            />
            <label htmlFor="newEventActive">Actif</label>
          </div>

          <button type="submit" className={styles.eventCreationButton}>
            Créer
          </button>
          {notificationMessage && <div>{notificationMessage}</div>}
        </form>
      </div>
    </section>
  );
}

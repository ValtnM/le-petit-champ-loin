"use client";
import styles from "./evenement.module.scss";
import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import BackBtn from "../../../../components/BackBtn/BackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Event({ params }) {
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  const [eventId, setEventId] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventSchedule, setEventSchedule] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [eventMembers, setEventMembers] = useState([]);
  const [eventIsActive, setEventIsActive] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState("");

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://" + process.env.IP_SERVER + ":8080/api/admin/checking", {
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
            getEventDetails(params.evenement);
            getMembers();
            setReadyToRender(true);
          }
        });
    } else {
      router.push("/connexion");
    }
  }, [router, params]);

  const getMembers = () => {
    const token = localStorage.getItem("token");

    fetch("http://" + process.env.IP_SERVER + ":8080/api/user/active", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error(error));
  };

  const getEventDetails = (eventId) => {
    const token = localStorage.getItem("token");

    fetch("http://" + process.env.IP_SERVER + ":8080/api/event/details", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: eventId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setEventId(data.id);
          setEventTitle(data.title);
          setEventSchedule(data.schedule);
          setEventDate(data.date.split("T")[0]);
          setEventLocation(data.location);
          setEventMembers(data.EventUsers);
          setEventIsActive(data.isActive);
        }
      })
      .catch((error) => console.log(error));
  };

  const modifyEvent = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch("http://" + process.env.IP_SERVER + ":8080/api/event/modify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: eventId,
        title: eventTitle,
        date: eventDate,
        schedule: eventSchedule,
        location: eventLocation,
        isActive: eventIsActive,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotificationMessage(data.success);
        } else if (data.error) {
          setNotificationMessage(data.error);
        } else if (data.errors) {
          setNotificationMessage(data.errors[0].msg);
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteEvent = () => {
    const token = localStorage.getItem("token");

    fetch("http://" + process.env.IP_SERVER + ":8080/api/event/delete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: eventId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/admin/evenements/");
      })
      .catch((error) => console.log(error));
  };

  const joinMember = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch("http://" + process.env.IP_SERVER + ":8080/api/event/add-user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: selectedMember,
        eventId: eventId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        getEventDetails(eventId);
      })
      .catch((error) => console.log(error));
  };

  const deleteMember = (eventUserId) => {
    const token = localStorage.getItem("token");

    fetch("http://" + process.env.IP_SERVER + ":8080/api/event/delete-user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: eventUserId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        getEventDetails(eventId);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {readyToRender && (
        <main className={styles.event}>
          <BackBtn path="/admin/evenements" text="Gestion des événements" />
          <form onSubmit={modifyEvent} className={styles.eventDetails}>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <input
              type="text"
              value={eventSchedule}
              onChange={(e) => setEventSchedule(e.target.value)}
            />
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />

            <select
              onChange={(e) => setSelectedMember(e.target.value)}
              name="members"
              id="members"
            >
              <option value="">Sélectionner un membre à associer</option>
              {members.map((member, index) => (
                <option key={index} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>

            <button onClick={(e) => joinMember(e)} className={styles.joinBtn}>
              <FontAwesomeIcon icon={faPlus} className={styles.joinIcon} />
              Associer
            </button>

            {eventMembers.length > 0 && (
              <div className={styles.membersThumbnails}>
                {eventMembers.map((member, index) => (
                  <div
                    onClick={() => deleteMember(member.Event_Users.id)}
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
                      src={`http://" + process.env.IP_SERVER + ":8080/api/images/${member.photo}`}
                      width={400}
                      height={400}
                      alt={`Photo de ${member.name}`}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className={styles.modifyEventCheckbox}>
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={eventIsActive}
                onChange={(e) => setEventIsActive(e.target.checked)}
              />
              <label htmlFor="isActive">Actif</label>
            </div>

            {notificationMessage && (
              <p className={styles.notificationMessage}>
                {notificationMessage}
              </p>
            )}
            <button className={styles.saveEventBtn} type="submit">
              Enregistrer les modifications
            </button>
            <button onClick={deleteEvent} className={styles.deleteEventBtn}>
              Supprimer l&apos;événement
            </button>
          </form>
        </main>
      )}
    </>
  );
}

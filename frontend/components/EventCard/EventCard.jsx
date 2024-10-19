"use client";
import styles from "./EventCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getDayName, getMonthName } from "../../utils/functions";

export default function EventCard({ event }) {
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = getDayName(String(date.getDay()));
    const num = String(date.getDate()).padStart(2, "0");
    const month = getMonthName(String(date.getMonth() + 1));

    return `${day} ${num} ${month}`;
  }

  
  return (
    <article className={styles.eventCard}>
      <Link href={`/admin/evenements/${event.id}`} className={styles.modifyBtn}>
        <h3>{event.title}</h3>
        <p>{event.location}</p>
        <p>{formatDate(event.date)}</p>
        <p>{event.schedule}</p>
        {event.EventUsers.length > 0 &&
          <div className={styles.memberList}>
            {event.EventUsers.map((user, index) => (
              <Image
              key={index}
              className={styles.photo}
              src={`http://${process.env.NEXT_PUBLIC_IP_SERVER}:8080/api/images/${user.photo}`}
              width={400}
              height={400}
              alt={`Photo de ${user.name}`}
            />
            ))}
          </div>
        }

      </Link>
    </article>
  );
}

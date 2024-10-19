"use client";
import Image from "next/image";
import styles from "./LocationCard.module.scss";
import Link from "next/link";

export default function LocationCard({ location }) {
  return (
    <Link href={`/admin/lieux/${location.id}`} className={styles.locationCard}>
      <h3>{location.name}</h3>
      <div className={styles.filter}></div>
      <Image
        className={styles.photo}
        src={`http://" + process.env.IP_SERVER + ":8080/api/images/${location.photo}`}
        width={400}
        height={400}
        alt={`Photo de ${location.name}`}
      />
    </Link>
  );
}

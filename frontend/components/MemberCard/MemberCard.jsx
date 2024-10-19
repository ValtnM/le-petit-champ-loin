"use client";
import Image from "next/image";
import styles from "./MemberCard.module.scss";
import Link from "next/link";

export default function MemberCard({ member }) {
  return (
    <article className={styles.memberCard}>
      <Link href={`/admin/membres/${member.id}`} className={styles.modifyBtn}>
        <Image
          className={styles.photo}
          src={`http://${process.env.NEXT_PUBLIC_IP_SERVER}:8080/api/images/${member.photo}`}
          width={400}
          height={400}
          alt={`Photo de ${member.name}`}
        />
      </Link>
    </article>
  );
}

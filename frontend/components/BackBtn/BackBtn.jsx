import React from "react";
import styles from "./BackBtn.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackBtn({ path, text }) {
  return (
    <Link href={path} className={styles.backBtn}>
      <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
      <div>{text}</div>
    </Link>
  );
}

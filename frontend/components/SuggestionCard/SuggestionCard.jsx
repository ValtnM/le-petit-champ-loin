"use client";
import styles from "./SuggestionCard.module.scss";
import Link from "next/link";

export default function SuggestionCard({ suggestion }) {
  return (
    <article className={styles.suggestionCard}>
      <Link
        href={`/admin/suggestions/${suggestion.id}`}
        className={styles.modifyBtn}
      >
        <h3>{suggestion.title}</h3>
        <p>{suggestion.description}</p>
      </Link>
    </article>
  );
}

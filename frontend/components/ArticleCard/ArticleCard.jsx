"use client";
import Image from "next/image";
import styles from "./ArticleCard.module.scss";
import Link from "next/link";
import defaultImg from '../../public/img/article_default.png';

export default function ArticleCard({ article }) {
  return (
    <Link href={`/admin/lieux/${article.id}`} className={styles.articleCard}>
      <h3>{article.title}</h3>
      <div className={styles.filter}></div>
      {article.photo ?
      <Image
      className={styles.photo}
      src={`http://localhost:8080/api/images/${article.photo}`}
      width={400}
      height={300}
      alt={`Photo de ${article.name}`}
      />
      :
      <Image className={styles.photo} src={defaultImg} width={400} height={300} alt="Image d'article par défaut"/>
    }
    </Link>
  );
}
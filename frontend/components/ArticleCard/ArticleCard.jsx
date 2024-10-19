"use client";
import Image from "next/image";
import styles from "./ArticleCard.module.scss";
import Link from "next/link";
import defaultImg from '../../public/img/article_default.png';

export default function ArticleCard({ article }) {
  return (
    <Link href={`/admin/articles/${article.id}`} className={styles.articleCard}>
      <h3>{article.title}</h3>
      <div className={styles.filter}></div>
      {article.photo ?
      <Image
      className={styles.photo}
      src={`http://" + process.env.IP_SERVER + ":8080/api/images/${article.photo}`}
      width={400}
      height={300}
      alt={`Photo de ${article.title}`}
      />
      :
      <Image className={styles.photo} src={defaultImg} width={400} height={300} alt="Image d'article par défaut"/>
    }
    </Link>
  );
}

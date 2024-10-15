import styles from "./blog.module.scss";
import Image from "next/image";
import { getMonthName } from "../../utils/functions";

export default async function page() {
  const data = await fetch("http://localhost:8080/api/article/active", {
    method: "POST",
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = getMonthName(String(date.getMonth() + 1));
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  const articles = await data.json();
  return (
    <main className={styles.blog}>
      <h2>Actualités</h2>
      <section className={styles.articles}>
        {articles.map((article, index) => (
          <article key={index}>
            {article.photo && (
              <Image
                className={styles.photo}
                src={`http://localhost:8080/api/images/${article.photo}`}
                alt={`Photo de ${article.title}`}
                width={500}
                height={250}
              />
            )}
            <div className={styles.infos}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <div className={styles.date}>
                <p>{formatDate(article.createdAt)}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

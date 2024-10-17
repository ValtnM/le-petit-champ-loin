import styles from "./equipe.module.scss";
import Image from "next/image";

export default async function equipe() {
  const data = await fetch("http://localhost:8080/api/user/active", {
    method: "POST",
  });

  const members = await data.json();
  return (
    <main className={styles.equipe}>
      <h2>L'équipe</h2>
      {members.map((member, index) => (
        <section key={index}>
          <Image
            className={styles.photo}
            src={`http://localhost:8080/api/images/${member.photo}`}
            alt={`Photo de ${member.name}`}
            width={250}
            height={250}
          />
          <div className={styles.infos}>
            <h3>{member.name}</h3>
            <p>{member.presentation}</p>
          </div>
        </section>
      ))}
    </main>
  );
}

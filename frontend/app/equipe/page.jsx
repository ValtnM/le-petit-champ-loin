import styles from "./equipe.module.scss";
import Image from "next/image";


export const metadata = {
  title: "Le Petit Champ Loin - Équipe",
  description: "Les membres de la ferme mettent tout en oeuvre pour vous proposer des légumes bio de qualité tout en appliquant des pratiques respectueuses de l'environnement",
};

export default async function equipe() {
  const data = await fetch(
    `http://${process.env.NEXT_PUBLIC_IP_SERVER}:8080/api/user/active`,
    {
      method: "POST",
      cache: "no-store",
    }
  );

  const members = await data.json();
  return (
    <main className={styles.equipe}>
      <h2>L&apos;équipe</h2>
      {members.length > 0 ? (
        <div>
          {members.map((member, index) => (
            <section key={index}>
              <Image
                className={styles.photo}
                src={`http://${process.env.NEXT_PUBLIC_IP_SERVER}:8080/api/images/${member.photo}`}
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
        </div>
      ) : (
        <div>
          <p>Aucun membre</p>
        </div>
      )}
    </main>
  );
}

import styles from "./styles/home.module.scss";
import Image from "next/image";
import Locality from "../public/img/locality.jpg";
import Greenhouse from "../public/img/greenhouse.jpg";
import Team from "../public/img/team.jpg";
import Vegetables from "../public/img/vegetables.jpg";

export const metadata = {
  title: "Le Petit Champ Loin - Accueil",
  description: "Le Petit Champ Loin est une exploitation maraîchère bio. Elle est présente sur quelques marché bio du Maine-et-Loire",
};


export default function Home() {
  return (
    <main className={styles.home}>
      {/* <h1>Hello World</h1> */}
      <section>
        <Image
          className={styles.img}
          src={Locality}
          width={960}
          height={640}
          alt="Lieu-dit 'Le petit champ loin'"
        />
        <div className={styles.homeText}>
          <h2>L&apos;histoire de la ferme</h2>
          <p>
            Située au cœur de la douce vallée de la Loire, à
            Saint-Georges-sur-Loire, la Ferme du Petit Champ Loin est le fruit
            d’une belle aventure familiale. Tout commence en 1992, lorsque Marie
            et Jean, animés par un profond amour de la nature, décident de
            quitter leur vie citadine pour redonner vie à un petit coin de terre
            abandonné. Ce lieu-dit, &quot;Le Petit Champ Loin&quot;, devient rapidement
            leur refuge, un espace où ils peuvent cultiver leur rêve d’une
            agriculture durable et respectueuse de l’environnement.
          </p>
          <p>
            Avec beaucoup de patience et de travail, ils transforment ce terrain
            en une exploitation maraîchère bio florissante, où chaque légume est
            cultivé avec soin, sans pesticides ni produits chimiques. À force de
            persévérance, leur ferme devient un modèle local d&apos;agriculture
            biologique, nourrissant les habitants de la région avec des produits
            sains et de saison.
          </p>
          <p>
            Aujourd’hui, leurs enfants, Claire et Thomas, ont repris le
            flambeau. Ils continuent de faire vivre la Ferme du Petit Champ
            Loin, en y apportant de nouvelles idées, tout en restant fidèles à
            la vision de leurs parents : cultiver la terre dans le respect de la
            nature et des générations futures.
          </p>
        </div>
      </section>
      <section>
        <Image
          className={styles.img}
          src={Greenhouse}
          width={960}
          height={640}
          alt="Serre 'Le petit champ loin'"
        />
        <div className={styles.homeText}>
          <h2>L’exploitation</h2>
          <p>
          La Ferme du Petit Champ Loin, située à Saint-Georges-sur-Loire, est un véritable écrin de nature dédié à l’agriculture biologique. Sur cette exploitation familiale, nous cultivons avec passion une grande variété de fruits et légumes de saison. Notre ferme s&apos;étend sur un champ de 2 hectares, où poussent en plein air nos cultures diversifiées. En complément, une dizaine de serres abritent nos cultures plus délicates, permettant d’allonger la saison et de garantir une production régulière tout au long de l&apos;année.
          </p>
          <p>
          Chaque jour, nous travaillons la terre avec respect et amour, en suivant des méthodes agroécologiques qui favorisent la biodiversité et protègent notre environnement. À la Ferme du Petit Champ Loin, nous croyons en une agriculture saine, durable, et accessible à tous. C’est pourquoi nous nous engageons à produire des aliments de qualité, tout en prenant soin de notre terre et de ceux qui la nourrissent.
          </p>
        </div>
      </section>
      <section>
        <Image
          className={styles.img}
          src={Team}
          width={960}
          height={640}
          alt="Équipe de 'Le petit champ loin'"
        />
        <div className={styles.homeText}>
          <h2>L’équipe</h2>
          <p>
          À la Ferme du Petit Champ Loin, une équipe engagée et passionnée travaille chaque jour pour vous offrir le meilleur de nos récoltes. Composée de cinq salariés permanents, notre équipe veille à chaque étape de la production, depuis la préparation des sols jusqu&apos;à la récolte, en passant par l&apos;entretien des serres et des cultures en plein champ.
          </p>
          <p>
          Pendant les périodes de pleine saison, nous accueillons également des saisonniers, qui viennent renforcer nos effectifs pour nous aider à répondre à la demande croissante. Ensemble, nous partageons les mêmes valeurs : le respect de la terre, la qualité des produits et la satisfaction de nos clients.
          </p>
        </div>
      </section>
      <section>
        <Image
          className={styles.img}
          src={Vegetables}
          width={960}
          height={640}
          alt="Légumes"
        />
        <div className={styles.homeText}>
          <h2>Les engagements</h2>
          <p>
          À la Ferme du Petit Champ Loin, nous sommes profondément engagés dans une agriculture biologique et respectueuse de l&apos;environnement. Chaque jour, nous cultivons nos terres avec le souci de préserver la biodiversité, sans utiliser de pesticides ni d&apos;engrais chimiques. Nous privilégions des pratiques durables, telles que la rotation des cultures, le compostage, et l’utilisation de semences paysannes, afin de garantir des sols vivants et fertiles pour les générations futures.
          </p>
          <p>
          Notre engagement va au-delà des normes du label bio : nous cultivons avec passion des produits sains, tout en réduisant notre empreinte écologique et en favorisant les circuits courts. En choisissant la Ferme du Petit Champ Loin, vous soutenez une agriculture qui prend soin de la terre, des plantes, et des personnes.
          </p>
        </div>
      </section>
    </main>
  );
}

import styles from "./contact.module.scss";
import ContactForm from "../../components/ContactForm/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function page() {
  return (
    <main className={styles.contact}>
      <h2>Nous contacter</h2>

      <section className={styles.email}>
        <div className={styles.title}>
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
          <h3>Écrivez-nous</h3>
        </div>
        <ContactForm />
      </section>
      <section className={styles.phone}>
        <div className={styles.title}>
          <FontAwesomeIcon className={styles.icon} icon={faPhone} />
          <h3>Appelez-nous</h3>
        </div>
        <p>01 23 45 67 89</p>
      </section>
    </main>
  );
}

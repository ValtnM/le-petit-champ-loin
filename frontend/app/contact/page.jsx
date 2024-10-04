import styles from "./contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function page() {
  return (
    <main className={styles.contact}>
      <h2>Nous contacter</h2>
      <section className={styles.phone}>
        <div className={styles.title}>
          <FontAwesomeIcon className={styles.icon} icon={faPhone} />
          <h3>Appelez-nous</h3>
        </div>
        <p>01 23 45 67 89</p>
      </section>
      <section className={styles.email}>
        <div className={styles.title}>
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
          <h3>Écrivez-nous</h3>
        </div>
        <form>
            <div className={styles.gender}>
                <div className={styles.genderInput}>
                    <input type="radio" id="woman" name="gender"/>
                    <label htmlFor="woman">Madame</label>
                </div>
                <div className={styles.genderInput}>
                    <input type="radio" id="man" name="gender" />
                    <label htmlFor="man">Monsieur</label>
                </div>
            </div>
            <div className={styles.firstnameInput}>
                <label htmlFor="firstname">Prénom</label>
                <input type="text" id="firstname" />
            </div>
            <div className={styles.lastnameInput}>
                <label htmlFor="lastname">Nom</label>
                <input type="text" id="lastname" />
            </div>
            <div className={styles.emailInput}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
            </div>
            <div className={styles.phoneInput}>
                <label htmlFor="phone">Téléphone</label>
                <input type="text" id="phone" />
            </div>
            <div className={styles.messageInput}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="10"/>
            </div>
            <button>Envoyer</button>
        </form>
      </section>
    </main>
  );
}

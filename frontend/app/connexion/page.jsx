import styles from "./connexion.module.scss";


export default function page() {
  return (
    <main className={styles.connexion}>
      <form>
        <h2>Connexion</h2>
        <div className={styles.formField}>
          <label htmlFor="user">Identifiant</label>
          <input id="user" type="text" name="user" />
        </div>
        <div className={styles.formField}>
          <label htmlFor="password">Mot de passe</label>
          <input id="password" type="password" name="password" />
        </div>
        <input type="submit" value="Se connecter" />
      </form>
    </main>
  )
}

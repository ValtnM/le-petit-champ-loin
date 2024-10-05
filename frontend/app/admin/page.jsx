import styles from "./admin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faNewspaper,
  faCalendar,
  faUsers,
  faLocationDot,
  faUstensils,
} from "@fortawesome/free-solid-svg-icons";

export default async function page() {
    const activeProductsRes = await fetch("http://localhost:8080/api/product/active", {
        method: "POST",
      });
      const activeProducts = await activeProductsRes.json();

    const productsRes = await fetch("http://localhost:8080/api/product/", {
        method: "POST",
      });
      const products = await productsRes.json();

    const activeMembersRes = await fetch("http://localhost:8080/api/user/active", {
        method: "POST",
      });
      const activeMembers = await activeMembersRes.json();

    const MembersRes = await fetch("http://localhost:8080/api/user/", {
        method: "POST",
      });
      const members = await MembersRes.json();

    const activeEventsRes = await fetch("http://localhost:8080/api/event/active", {
        method: "POST",
      });
      const activeEvents = await activeEventsRes.json();

    const eventsRes = await fetch("http://localhost:8080/api/event/", {
        method: "POST",
      });
      const events = await eventsRes.json();

    const activeLocationsRes = await fetch("http://localhost:8080/api/location/active", {
        method: "POST",
      });
      const activeLocations = await activeLocationsRes.json();

    const locationsRes = await fetch("http://localhost:8080/api/location/", {
        method: "POST",
      });
      const locations = await locationsRes.json();

    const activeSuggestionsRes = await fetch("http://localhost:8080/api/suggestion/active", {
        method: "POST",
      });
      const activeSuggestions = await activeSuggestionsRes.json();

    const suggestionsRes = await fetch("http://localhost:8080/api/suggestion/", {
        method: "POST",
      });
      const suggestions = await suggestionsRes.json();

    const activeArticlesRes = await fetch("http://localhost:8080/api/article/active", {
        method: "POST",
      });
      const activeArticles = await activeArticlesRes.json();

    const articlesRes = await fetch("http://localhost:8080/api/article/", {
        method: "POST",
      });
      const articles = await articlesRes.json();

  return (
    <main className={styles.admin}>
      <h2>Tableau de bord</h2>
      <article>
        <div className={styles.title}>
          <FontAwesomeIcon
            icon={faBasketShopping}
            className={styles.linkIcon}
          />
          <h3>Produits</h3>
        </div>
        <div className={styles.numberOfElement}>
          <div className={styles.activeElements}>
            <p>Actifs</p>
            <p>{activeProducts.length}</p>
          </div>
          <div className={styles.totalElements}>
            <p>Total</p>
            <p>{products.length}</p>
          </div>
        </div>
      </article>
      <article>
        <div className={styles.title}>
          <FontAwesomeIcon
            icon={faUsers}
            className={styles.linkIcon}
          />
          <h3>Membres</h3>
        </div>
        <div className={styles.numberOfElement}>
          <div className={styles.activeElements}>
            <p>Actifs</p>
            <p>{activeMembers.length}</p>
          </div>
          <div className={styles.totalElements}>
            <p>Nombre</p>
            <p>{members.length}</p>
          </div>
        </div>
      </article>
      <article>
        <div className={styles.title}>
          <FontAwesomeIcon
            icon={faCalendar}
            className={styles.linkIcon}
          />
          <h3>Événements</h3>
        </div>
        <div className={styles.numberOfElement}>
          <div className={styles.activeElements}>
            <p>Actifs</p>
            <p>{activeEvents.length}</p>
          </div>
          <div className={styles.totalElements}>
            <p>Total</p>
            <p>{events.length}</p>
          </div>
        </div>
      </article>
      <article>
        <div className={styles.title}>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={styles.linkIcon}
          />
          <h3>Lieux</h3>
        </div>
        <div className={styles.numberOfElement}>
          <div className={styles.activeElements}>
            <p>Actifs</p>
            <p>{activeLocations.length}</p>
          </div>
          <div className={styles.totalElements}>
            <p>Total</p>
            <p>{locations.length}</p>
          </div>
        </div>
      </article>
      <article>
        <div className={styles.title}>
          <FontAwesomeIcon
            icon={faUstensils}
            className={styles.linkIcon}
          />
          <h3>Suggestions</h3>
        </div>
        <div className={styles.numberOfElement}>
          <div className={styles.activeElements}>
            <p>Actifs</p>
            <p>{activeSuggestions.length}</p>
          </div>
          <div className={styles.totalElements}>
            <p>Total</p>
            <p>{suggestions.length}</p>
          </div>
        </div>
      </article>
      <article>
        <div className={styles.title}>
          <FontAwesomeIcon
            icon={faNewspaper}
            className={styles.linkIcon}
          />
          <h3>Articles</h3>
        </div>
        <div className={styles.numberOfElement}>
          <div className={styles.activeElements}>
            <p>Actifs</p>
            <p>{activeArticles.length}</p>
          </div>
          <div className={styles.totalElements}>
            <p>Total</p>
            <p>{articles.length}</p>
          </div>
        </div>
      </article>
      
    </main>
  );
}

import styles from "./produits.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProductCard from '../../../components/ProductCard/ProductCard';

export default async function page() {
  const productRes = await fetch("http://localhost:8080/api/product/", {
    method: "POST",
  });
  const products = await productRes.json();
  return (
    <main className={styles.products}>
      <button className={styles.backBtn}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
        <div>Tableau de bord</div>
      </button>
      <h2>Gestion des produits</h2>
      {products ? (
        <section>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />        
          ))}
        </section>
      ) : (
        <p>Aucun produit disponible</p>
      )}
    </main>
  );
}

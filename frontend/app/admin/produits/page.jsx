import styles from "./produits.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

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
            <article key={index}>
              {/* <Link href={`/admin/produits/${product.id}`}> */}
              {product.Product_Photos.length > 0 && (
                <div className={styles.imgContainer}>
                  <Image
                    className={styles.photo}
                    src={`http://localhost:8080/api/images/${product.Product_Photos[0].name}`}
                    width={400}
                    height={400}
                    alt={`Photo de ${product.name}`}
                  />
                </div>
              )}
              <div className={styles.filter}></div>
              <div className={styles.command}>
                <div className={styles.infos}>
                  <h3>{product.name}</h3>
                  <input
                    type="checkbox"
                    id="active"
                    checked={product.isActive}
                  />
                </div>
                <button className={styles.modifyBtn}>Modifier</button>
              </div>
              {/* </Link> */}
            </article>
          ))}
        </section>
      ) : (
        <p>Aucun produit disponible</p>
      )}
    </main>
  );
}

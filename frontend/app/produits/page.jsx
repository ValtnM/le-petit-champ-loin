import styles from "./produits.module.scss";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const productRes = await fetch("http://localhost:8080/api/product/active", {
    method: "POST",
  });
  const products = await productRes.json();

  return (
    <main className={styles.products}>
      <h2>Produits disponibles</h2>
      {products.length > 0 ? (
        <section>
          {products.map((product, index) => (
            <article key={index}>
              <Link href={`/produits/${product.id}`}>
              <Image
                className={styles.photo}
                src={`http://localhost:8080/api/images/${product.Product_Photos[0].name}`}
                width={400}
                height={400}
                alt={`Photo de ${product.name}`}
                />
              <div className={styles.hover}>
                <h3>{product.name}</h3>
              </div>
                </Link>
            </article>
          ))}
        </section>
      ) : (
        <section>
          <p>Aucun produit disponible</p>
        </section>
      )}
    </main>
  );
}

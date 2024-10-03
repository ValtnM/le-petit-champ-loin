import styles from "./produits.module.scss";
import Image from "next/image";

export default async function page() {
  const productRes = await fetch("http://localhost:8080/api/product/active", {
    method: "POST",
  });
  const products = await productRes.json();
  console.log(products[0].Product_Photos);

  return (
    <main className={styles.products}>
      <h2>Produits disponibles</h2>
      {products.length > 0 ? (
        <section>
          {products.map((product, index) => (
            <article key={index}>
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

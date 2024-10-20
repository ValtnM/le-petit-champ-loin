import styles from "./produits.module.scss";
import Image from "next/image";
import Link from "next/link";

export default async function produits() {
  const productRes = await fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/product/active", {
    method: "POST",
    cache: "no-store",
  });
  const products = await productRes.json();

  return (
    <main className={styles.products}>
      <h2>Produits disponibles</h2>
      {products.length > 0 ? (
        <section>
          {products.map((product, index) => (
            <Link className={styles.product} key={index} href={`/produits/${product.id}`}>
              <Image
                className={styles.photo}
                src={`http://${process.env.NEXT_PUBLIC_IP_SERVER}:8080/api/images/${product.Product_Photos[0].name}`}
                width={400}
                height={400}
                alt={`Photo de ${product.name}`}
              />
              <div className={styles.hover}>
                <h3>{product.name}</h3>
              </div>
            </Link>
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

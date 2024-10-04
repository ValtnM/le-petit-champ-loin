import styles from "./produit.module.scss";
import SwiperProduct from "../../../components/SwiperProduct/SwiperProduct";
import Image from "next/image";

export default async function page({ params }) {
  const productRes = await fetch(`http://localhost:8080/api/product/details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: params.produit }),
  });
  const product = await productRes.json();

  return (
    <main className={styles.product}>
      <h2>{product.name}</h2>
      <div className={styles.productDetails}>
        {product.Product_Photos && (
          <SwiperProduct photos={product.Product_Photos} />
        )}
        <p>{product.description}</p>
      </div>
      {product.Suggestions.length > 0 && (
        <section className={styles.suggestions}>
          <h3>Comment les consommer ?</h3>
          <div className={styles.suggestionsList}>
            {product.Suggestions.map((suggestion, index) => (
              <article className={styles.suggestion} key={index}>
                <h4>{suggestion.title}</h4>
                <p>{suggestion.description}</p>
                <Image
                  className={styles.photo}
                  src={`http://localhost:8080/api/images/${suggestion.Users.photo}`}
                  width={100}
                  height={100}
                  alt={`Photo de ${suggestion.Users.name}`}
                />
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

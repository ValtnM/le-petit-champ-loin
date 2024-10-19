"use client";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductCard({ key, product }) {
  const [status, setStatus] = useState(product.isActive);

  useEffect(() => {
    fetch("http://" + process.env.IP_SERVER + ":8080/api/product/modify-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...product, isActive: status }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [status]);

  return (
    <article className={styles.productCard} key={key}>
      {product.Product_Photos.length > 0 && (
        <div className={styles.imgContainer}>
          <Image
            className={styles.photo}
            src={`http://" + process.env.IP_SERVER + ":8080/api/images/${product.Product_Photos[0].name}`}
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
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
        <Link href={`/admin/produits/${product.id}`} className={styles.modifyBtn}>Modifier</Link>
      </div>
    </article>
  );
}

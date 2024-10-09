"use client";

import styles from "./produits.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../../../components/ProductCard/ProductCard";
import ModalProduct from "../../../components/ModalProduct/ModalProduct";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { useState, useEffect } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [modalIsActive, setModalIsActive] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch("http://localhost:8080/api/product/", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  return (
    <main className={styles.products}>
      <BackBtn path="/admin" text="Tableau de bord" />
      <h2>Gestion des produits</h2>
      {/* {products.length > 0 ? ( */}
      <section className={styles.productList}>
        <article
          onClick={() => setModalIsActive(true)}
          className={styles.addProduct}
        >
          <h3>Ajouter</h3>
          <FontAwesomeIcon icon={faPlus} className={styles.icon} />
        </article>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>
      {/* ) : (
        <p>Aucun produit disponible</p>
      )} */}
      {modalIsActive && (
        <ModalProduct
          setIsActive={setModalIsActive}
          getProducts={getProducts}
        />
      )}
    </main>
  );
}

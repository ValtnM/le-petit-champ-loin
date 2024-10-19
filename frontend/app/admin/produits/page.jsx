"use client";

import styles from "./produits.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../../../components/ProductCard/ProductCard";
import ModalProduct from "../../../components/ModalProduct/ModalProduct";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  const [products, setProducts] = useState([]);
  const [modalIsActive, setModalIsActive] = useState(false);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/admin/checking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.isConnected) {
            router.push("/connexion");
          } else {
            getProducts();
            setReadyToRender(true);
          }
        });
    } else {
      router.push("/connexion");
    }
  }, [router]);

  const getProducts = () => {
    const token = localStorage.getItem("token");

    fetch("http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/product/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {readyToRender && (
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
      )}
    </>
  );
}

"use client";
import styles from "./suggestions.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SuggestionCard from "../../../components/SuggestionCard/SuggestionCard";
import ModalSuggestion from "../../../components/ModalSuggestion/ModalSuggestion";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function Suggestions() {
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsActive, setModalIsActive] = useState(false);

  useLayoutEffect(() => {
    document.title = `Le Petit Champ Loin - Gestion des suggestions`;

    const token = localStorage.getItem("token");
    if (token) {
      fetch(
        "http://" +
          process.env.NEXT_PUBLIC_IP_SERVER +
          ":8080/api/admin/checking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      )
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

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      getSuggestions(selectedProduct);
    }
  }, [selectedProduct]);

  const getSuggestions = (productId) => {
    const token = localStorage.getItem("token");

    fetch(
      "http://" +
        process.env.NEXT_PUBLIC_IP_SERVER +
        ":8080/api/suggestion/product/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    )
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.error(error));
  };

  const getProducts = () => {
    const token = localStorage.getItem("token");

    fetch(
      "http://" + process.env.NEXT_PUBLIC_IP_SERVER + ":8080/api/product/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {readyToRender && (
        <main className={styles.suggestions}>
          <BackBtn path="/admin" text="Tableau de bord" />
          <h2>Gestion des suggestions</h2>
          <select
            onChange={(e) => setSelectedProduct(e.target.value)}
            name="vegetable"
            id="vegetable"
          >
            <option value="">Sélectionner un produit</option>
            {products.map((product, index) => (
              <option key={index} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <section className={styles.suggestionsList}>
            <article
              onClick={() => setModalIsActive(true)}
              className={styles.addSuggestion}
            >
              <h3>Ajouter</h3>
              <FontAwesomeIcon
                icon={faPlus}
                className={styles.addSuggestionIcon}
              />
            </article>
            {suggestions.length > 0 ? (
              <div>
                {suggestions.map((suggestion, index) => (
                  <SuggestionCard key={index} suggestion={suggestion} />
                ))}
              </div>
            ) : (
              <p className={styles.noSuggestionMessage}>
                Aucune suggestion trouvé
              </p>
            )}
          </section>
          {modalIsActive && (
            <ModalSuggestion
              products={products}
              selectedProduct={selectedProduct}
              setIsActive={setModalIsActive}
              getSuggestions={getSuggestions}
            />
          )}
        </main>
      )}
    </>
  );
}

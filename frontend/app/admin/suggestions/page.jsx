"use client";
import styles from "./suggestions.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SuggestionCard from "../../../components/SuggestionCard/SuggestionCard";
import ModalSuggestion from "../../../components/ModalSuggestion/ModalSuggestion";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { useState, useEffect } from "react";

export default function Page() {
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsActive, setModalIsActive] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      getSuggestions(selectedProduct);
    }
  }, [selectedProduct]);

  const getSuggestions = (productId) => {
    fetch("http://localhost:8080/api/suggestion/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.error(error));
  };

  const getProducts = () => {
    fetch("http://localhost:8080/api/product/", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  return (
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
      {selectedProduct && (
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
            <p className={styles.noSuggestionMessage}>Aucune suggestion trouvé</p>
          )}
        </section>
      )}
      {modalIsActive && (
        <ModalSuggestion
        products={products}
          setIsActive={setModalIsActive}
          getSuggestions={getSuggestions}
        />
      )}
    </main>
  );
}

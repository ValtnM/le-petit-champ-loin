"use client";

import styles from "./AddProduct.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalProduct from "../ModalProduct/ModalProduct";

export default function AddProduct() {
  const [activeModal, setActiveModal] = useState(true);
  return (
    <article onClick={() => setActiveModal(true)} className={styles.addProduct}>
      {activeModal && <ModalProduct />}

      <h3>Ajouter</h3>
      <FontAwesomeIcon icon={faPlus} className={styles.icon} />
    </article>
  );
}

"use client";
import styles from "./ModalProduct.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ModalProduct({ setIsActive, getProducts }) {
  // form state
  const [newProductType, setNewProductType] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductIsActive, setNewProductIsActive] = useState(false);
  const [newProductFiles, setNewProductFiles] = useState([]);
  const [newProductPreviewImages, setNewProductPreviewImages] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Send request to API
  const addProduct = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("type", newProductType);
    formData.append("name", newProductName);
    formData.append("description", newProductDescription);
    formData.append("isActive", newProductIsActive);
    for (let i = 0; i < newProductFiles.length; i++) {
      formData.append("photos", newProductFiles[i]);
    }
    fetch("http://localhost:8080/api/product/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setNotificationMessage(data.success);
          clearForm();
          getProducts();
        } else if (data.error) {
          setNotificationMessage(data.error);
        } else if (data.errors) {
          setNotificationMessage(data.errors[0].msg);
        }
      });
  };

  useEffect(() => {
    const newPreviews = newProductFiles
      .map((file) => {
        if (file) {
          return URL.createObjectURL(file);
        }
        return null;
      })
      .filter((preview) => preview !== null);

    setNewProductPreviewImages(newPreviews);
  }, [newProductFiles]);

  useEffect(() => {
    console.log("preview", newProductPreviewImages);
  }, [newProductPreviewImages]);

  const clickFileInput = (e) => {
    e.preventDefault();
    document.getElementById("uploadFile").click();
  };

  const handleInputFile = (e) => {
    setNewProductFiles([...newProductFiles, e.target.files[0]]);
  };

  const deleteImage = (e, index) => {
    e.preventDefault();

    const newArrayFiles = [...newProductFiles];
    newArrayFiles.splice(index, 1);
    setNewProductFiles(newArrayFiles);
  };

  const clearForm = () => {
    setNewProductType("");
    setNewProductName("");
    setNewProductDescription("");
    setNewProductFiles([]);
    setNewProductPreviewImages([]);
    setNewProductIsActive(false);
  };

  return (
    <section className={styles.modalProduct}>
      <div className={styles.container}>
        <FontAwesomeIcon
          onClick={() => setIsActive(false)}
          icon={faCircleXmark}
          className={styles.closeModal}
        />

        <h2>Ajout d'un produit</h2>
        <form onSubmit={(e) => addProduct(e)}>
          <div className={styles.productCreationSelect}>
            <label htmlFor="type">Type</label>
            <select
              onChange={(e) => setNewProductType(e.target.value)}
              name="type"
              id="type"
              value={newProductType}
              
            >
              <option value="">Sélectionner un type</option>
              <option value="légume">Légume</option>
              <option value="fruit">Fruit</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="name">Nom</label>
            <input
              onChange={(e) => setNewProductName(e.target.value)}
              type="text"
              id="name"
              value={newProductName}
              
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="description">Description</label>
            <textarea
              onChange={(e) => setNewProductDescription(e.target.value)}
              name="description"
              id="description"
              rows={20}
              value={newProductDescription}
              
            ></textarea>
          </div>
          <div className={styles.uploadBtn}>
            <input onChange={handleInputFile} type="file" id="uploadFile" />
            <button onClick={(e) => clickFileInput(e)}>
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
              Ajouter une photo
            </button>
          </div>
          {newProductPreviewImages.length > 0 &&
            newProductPreviewImages.map((image, index) => (
              <div key={index} className={styles.productCreationPreview}>
                <button
                  onClick={(e) => deleteImage(e, index)}
                  className={styles.productCreationPreviewButton}
                >
                  <FontAwesomeIcon icon={faTrash} className={styles.icon} />
                </button>
                <Image
                  className={styles.productCreationPreviewImage}
                  src={image}
                  width={400}
                  height={300}
                  alt="Photo ajoutée"
                />
              </div>
            ))}
          <div className={styles.productCreationCheckbox}>
            <input
              onChange={(e) => setNewProductIsActive(e.target.checked)}
              type="checkbox"
              id="newProductActive"
              name="newProductActive"
              value={newProductIsActive}
            />
            <label htmlFor="newProductActive">Actif</label>
          </div>
          <button type="submit" className={styles.productCreationButton}>
            Créer
          </button>
          {notificationMessage && <div>{notificationMessage}</div>}
        </form>
      </div>
    </section>
  );
}

"use client";
import styles from "./produit.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import BackBtn from "../../../../components/BackBtn/BackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  const typeList = ["légume", "fruit"];

  const [productId, setProductId] = useState("");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productIsActive, setProductIsActive] = useState(false);
  const [productPhotos, setProductPhotos] = useState([]);

  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    getProductDetails(params.produit);
  }, [params]);

  const getProductDetails = (productId) => {
    fetch("http://localhost:8080/api/product/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProductId(data.id);
          setProductType(data.type);
          setProductName(data.name);
          setProductDescription(data.description);
          setProductIsActive(data.isActive);
          setProductPhotos(data.Product_Photos);
        }
      })
      .catch((error) => console.log(error));
  };

  const modifyProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/product/modify-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productId,
        name: productName,
        type: productType,
        description: productDescription,
        isActive: productIsActive,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotificationMessage(data.message);
      })
      .catch((error) => console.log(error));
  };

  const clickFileInput = (e) => {
    e.preventDefault();
    document.getElementById("uploadFile").click();
  };

  const addPhoto = (e) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("id", productId);
      formData.append("photo", e.target.files[0], `${productName}.jpg`);

      fetch("http://localhost:8080/api/product/add-photo", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          getProductDetails(productId);
        })
        .catch((error) => console.log(error));
    }
  };

  const deletePhoto = (photoId) => {
    fetch("http://localhost:8080/api/product/delete-photo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: photoId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        getProductDetails(productId);
      })
      .catch((error) => console.log(error));
  };

  const deleteProduct = () => {
    fetch("http://localhost:8080/api/product/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/admin/produits/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className={styles.product}>
      <BackBtn path="/admin/produits" text="Gestion des produits" />
      <form onSubmit={modifyProduct} className={styles.productDetails}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <select
          name="type"
          id="type"
          onChange={(e) => setProductType(e.target.value)}
          value={productType}
        >
          {typeList.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <textarea
          name=""
          id=""
          value={productDescription}
          rows={20}
          onChange={(e) => setProductDescription(e.target.value)}
        ></textarea>
        <div className={styles.isActive}>
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={productIsActive}
            onChange={(e) => setProductIsActive(e.target.checked)}
          />
          <label htmlFor="isActive">Actif</label>
        </div>
        {productPhotos && (
          <div className={styles.photosList}>
            {productPhotos.map((photo, index) => (
              <div key={index} className={styles.imageContainer}>
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className={styles.deletePhotoBtn}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={styles.deleteIcon}
                  />
                </button>

                <Image
                  className={styles.photo}
                  src={`http://localhost:8080/api/images/${photo.name}`}
                  width={400}
                  height={300}
                  alt={`Photo de ${productName}`}
                />
              </div>
            ))}
            <div className={styles.addPhotoBtn}>
              <input onChange={addPhoto} type="file" id="uploadFile" />
              <button onClick={(e) => clickFileInput(e)}>
                <FontAwesomeIcon icon={faPlus} className={styles.addIcon} />
                Ajouter une photo
              </button>
            </div>
          </div>
        )}
        {notificationMessage &&
            <p className={styles.notificationMessage}>{notificationMessage}</p>
        }
        <button className={styles.saveProductBtn} type="submit">
          Enregistrer les modifications
        </button>
        <button onClick={deleteProduct} className={styles.deleteProductBtn}>
          Supprimer le produit
        </button>
      </form>
    </main>
  );
}

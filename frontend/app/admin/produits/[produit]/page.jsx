"use client";
import styles from "./produit.module.scss";
import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import BackBtn from "../../../../components/BackBtn/BackBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  const [readyToRender, setReadyToRender] = useState(false);

  const typeList = ["légume", "fruit"];

  const [productId, setProductId] = useState("");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productIsActive, setProductIsActive] = useState(false);
  const [productPhotos, setProductPhotos] = useState([]);

  const [notificationMessage, setNotificationMessage] = useState("");

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/api/admin/checking", {
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
            getProductDetails(params.produit);
            setReadyToRender(true);
          }
        });
    } else {
      router.push("/connexion");
    }
  }, [router, params]);

  const getProductDetails = (productId) => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/product/details", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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

    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/product/modify-product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
        if (data.success) {
          setMemberPassword("");
          setNotificationMessage(data.success);
        } else if (data.error) {
          setNotificationMessage(data.error);
        } else if (data.errors) {
          setNotificationMessage(data.errors[0].msg);
        }
      })
      .catch((error) => console.log(error));
  };

  const clickFileInput = (e) => {
    e.preventDefault();
    document.getElementById("uploadFile").click();
  };

  const addPhoto = (e) => {
    if (e.target.files) {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("id", productId);
      formData.append("photo", e.target.files[0], `${productName}.jpg`);

      fetch("http://localhost:8080/api/product/add-photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.error) {
            setNotificationMessage(data.error)
          } else {
            setNotificationMessage("")
          }
          getProductDetails(productId);
        })
        .catch((error) => console.log(error));
    }
  };

  const deletePhoto = (photoId) => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/product/delete-photo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/product/delete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
    <>
      {readyToRender && (
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
            {notificationMessage && (
              <p className={styles.notificationMessage}>
                {notificationMessage}
              </p>
            )}
            <button className={styles.saveProductBtn} type="submit">
              Enregistrer les modifications
            </button>
            <button onClick={deleteProduct} className={styles.deleteProductBtn}>
              Supprimer le produit
            </button>
          </form>
        </main>
      )}
    </>
  );
}

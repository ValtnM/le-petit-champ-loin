import styles from './Slider.module.scss';
import Image from 'next/image';

export default function Slider() {  
 
  return (
    <section className={styles.sliderContainer}>
      <article>
        <h3>Marché</h3>
        <p>Place Molière, Angers</p>
        <p>8h00 - 13h00</p>
        <p>Samedi 5 octobre</p>
        <div>
        <Image
            className={styles.photo}
            src={`http://localhost:8080/api/images/beard-1845166_6401727362458854.jpg`}
            alt={`Photo de Thomas`}
            width={50}
            height={50}
          />
        <Image
            className={styles.photo}
            src={`http://localhost:8080/api/images/beard-1845166_6401727362458854.jpg`}
            alt={`Photo de Thomas`}
            width={50}
            height={50}
          />
        </div>
      </article>
    </section>
  );
}

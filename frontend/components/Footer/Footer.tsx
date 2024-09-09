import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul>
          <li>
            <Link href="/mentions-legales">Mentions légales</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Image
        src="/img/logo.png"
        width={100}
        height={100}
        alt="Logo le petit champ loin"
      />
    </footer>
  );
}

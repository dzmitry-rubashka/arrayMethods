import Link from "next/link";

import styles from "../styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.wrapper}>
      <Link href="/">
        <a className={styles.link}>Home</a>
      </Link>
      <Link href="/difference">
        <a className={styles.link}>Difference</a>
      </Link>
      <Link href="/intersection">
        <a className={styles.link}>Intersection</a>
      </Link>
      <Link href="/union">
        <a className={styles.link}>Union</a>
      </Link>
    </nav>
  );
};

export default Navbar;

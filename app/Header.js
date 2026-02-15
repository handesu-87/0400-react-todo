import styles from "./Header.module.sass";
export default function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>Todo</h1>
    </div>
  );
}

import styles from "./Form.module.sass";
export default function Form() {
  return (
    <form className={`${styles.form} ${styles["js-form"]}`}>
      <div className={styles["form__input-group"]}>
        <div
          className={`${styles["form__input"]} ${styles["form__input--name"]}`}
        >
          <label className={styles["form__input-label"]}>タスク</label>
          <input
            name="name"
            type="text"
            className={styles["form__input-field"]}
            placeholder="タスク名を入力"
          />
        </div>
        <div className={styles["form__input"]}>
          <label className={styles["form__input-label"]}>期限日</label>
          <input
            name="deadline"
            type="date"
            className={styles["form__input-field"]}
            placeholder="期限日を入力"
          />
        </div>
      </div>
      <div className={styles["form__input-footer"]}>
        <button className={`${styles.button} ${styles["button--primary"]}`}>
          追加
        </button>
      </div>
    </form>
  );
}

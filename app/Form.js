import React from "react";

import styles from "./Form.module.sass";

export default function Form(props) {
  const [taskName, setTaskName] = React.useState("");
  const [taskDeadline, setTaskDeadline] = React.useState("");
  const inputRef = React.useRef(null);
  // console.log(inputRef);

  const handleTextInput = (e) => {
    setTaskName(e.currentTarget.value);
  };
  const handleDeadlineInput = (e) => {
    setTaskDeadline(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      window.alert("タスク名を入力してください。");
      return;
    }

    if (!taskDeadline) {
      window.alert("期限日を入力してください。");
      return;
    }

    props.onSubmit(taskName, taskDeadline);
    setTaskName("");
    setTaskDeadline("");
    inputRef.current.focus();
  };

  return (
    <form
      className={`${styles.form} ${styles["js-form"]}`}
      onSubmit={handleSubmit}
    >
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
            value={taskName}
            onChange={handleTextInput}
            ref={inputRef}
          />
        </div>
        <div className={styles["form__input"]}>
          <label className={styles["form__input-label"]}>期限日</label>
          <input
            name="deadline"
            type="date"
            className={styles["form__input-field"]}
            placeholder="期限日を入力"
            onChange={handleDeadlineInput}
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

import React from "react";

import styles from "../styles/components/Form.module.sass";

export default function Form({ onSubmit }) {
  const [taskName, setTaskName] = React.useState("");
  const [taskDeadline, setTaskDeadline] = React.useState("");
  const inputRef = React.useRef(null);

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
    console.log(onSubmit);
    onSubmit(taskName, taskDeadline);
    setTaskName("");
    setTaskDeadline("");
    inputRef.current.focus();
    // console.log(inputRef);
  };

  return (
    <form
      className={`${styles.form} ${styles.formJsForm}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.formInputGroup}>
        <div className={`${styles.formInput} ${styles.formInputName}`}>
          <label className={styles.formInputLabel}>タスク</label>
          <input
            name="name"
            type="text"
            className={styles.formInputField}
            placeholder="タスク名を入力"
            value={taskName}
            onChange={handleTextInput}
            ref={inputRef}
          />
        </div>

        <div className={styles.formInput}>
          <label className={styles.formInputLabel}>期限日</label>
          <input
            name="deadline"
            type="date"
            className={styles.formInputField}
            value={taskDeadline}
            onChange={handleDeadlineInput}
          />
        </div>
      </div>

      <div className={styles.formInputFooter}>
        <button className={`${styles.button} ${styles.buttonPrimary}`}>
          追加
        </button>
      </div>
    </form>
  );
}

"use client";

import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../styles/components/Lists.module.sass";

export default function ListItem({
  task,
  showCompleted,
  onChecked,
  onDelete,
  onRename,
  onDeadlineChange,
}) {
  console.log(
    // task,
    // showCompleted,
    onChecked,
    // onDelete,
    // onRename,
    // onDeadlineChange,
  );

  const [isEditing, setIsEditing] = React.useState(false); //編集モードかどうか
  const [draftName, setDraftName] = React.useState(task.name); //入力中のテキストの状態

  const [isEditingDeadline, setIsEditingDeadline] = React.useState(false); //編集モードかどうか
  const [draftDeadline, setDraftDeadline] = React.useState(
    task.deadline.toString(),
  ); //入力中のテキストの状態 : YYYY-MM-ddの文字列

  const handleCheckbox = () => onChecked(task.id);
  const handleDelete = () => onDelete(task.id);

  const saveTaskName = () => {
    if (!draftName.trim()) {
      window.alert("タスク名を入力してください。");
      setIsEditing(false);
      return;
    }
    onRename(task.id, draftName.trim());
    setIsEditing(false);
  };

  const saveDeadline = () => {
    if (!draftDeadline) {
      window.alert("期限日を入力してください。");
      setIsEditingDeadline(false);
      return;
    }
    onDeadlineChange(task.id, draftDeadline);
    setIsEditingDeadline(false);
  };

  // 締切が編集モードになった直後にカレンダーUIを開く
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (!isEditingDeadline) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    // Chrome/Safari系で効くことが多い（対応してないブラウザもある）
    if (typeof el.showPicker === "function") {
      el.showPicker();
    }
  }, [isEditingDeadline]);

  const ref = React.useRef(null);

  return (
    <li ref={ref} className={`${styles.listItem}`}>
      <div className={`${styles.listItemCol} ${styles.listItemColCheckbox}`}>
        <label
          className={`${styles.checkbox} ${
            task.isCompleted ? styles.checkboxChecked : ""
          }`}
        >
          <input
            name="checkbox"
            type="checkbox"
            className={styles.checkboxInput}
            checked={task.isCompleted}
            onChange={() => {
              //もし、「完了タスクを表示」のときは、未完了▶︎完了のアニメーションをしない
              if (showCompleted) {
                handleCheckbox();
                return;
              }

              // 完了▶︎未完了のアニメーションもしない
              if (task.isCompleted) {
                handleCheckbox(); // true→false に戻す
                return;
              }

              const labelEl = ref.current.querySelector("label");
              labelEl.classList.add(styles.checkboxChecked);
              ref.current.classList.add(styles.listItemCompletedDismissing);
              setTimeout(() => {
                handleCheckbox();
              }, 800);
            }}
          />
          <FontAwesomeIcon
            icon={faCheck}
            className={`${styles.icon} ${styles.iconCheck}`}
          />
        </label>
      </div>

      <div className={`${styles.listItemCol} ${styles.listItemColName}`}>
        {isEditing ? ( //編集中ならinput, そうでないならdiv
          <input
            className={styles.listItemColNameEdit}
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onBlur={saveTaskName}
            autoFocus
          />
        ) : (
          <div onClick={() => setIsEditing(true)}>{task.name}</div>
        )}
      </div>

      <div className={`${styles.listItemCol} ${styles.listItemColDeadline}`}>
        {isEditingDeadline ? ( //編集中ならinput, そうでないならdiv
          <input
            ref={inputRef}
            type="date"
            value={draftDeadline}
            onChange={(e) => {
              console.log(e.target.value);
              setDraftDeadline(e.target.value);
            }}
            onBlur={saveDeadline}
            autoFocus
            className={styles.listItemColDeadlineEdit}
          />
        ) : (
          <div
            onClick={() => setIsEditingDeadline(true)}
            className={styles.deadlineText}
          >
            {task.deadline.toString()}
          </div>
        )}
      </div>

      <div
        className={`${styles.listItemCol} ${styles.listItemColActions}`}
        onClick={handleDelete}
      >
        <FontAwesomeIcon
          icon={faTrash}
          className={`${styles.icon} ${styles.iconTrash}`}
        />
      </div>
    </li>
  );
}

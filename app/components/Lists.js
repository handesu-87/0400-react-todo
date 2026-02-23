"use client";

import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

import { AppDate } from "../lib";

import styles from "../styles/components/Lists.module.sass";

const List = (props) => {
  console.log(props);
  const task = props.task;
  console.log(task.deadline.toString());

  const [isEditing, setIsEditing] = React.useState(false); //編集モードかどうか
  const [draftName, setDraftName] = React.useState(task.name); //入力中のテキストの状態

  const [isEditingDeadline, setIsEditingDeadline] = React.useState(false); //編集モードかどうか
  const [draftDeadline, setDraftDeadline] = React.useState(
    task.deadline.toString(),
  ); //入力中のテキストの状態 - YYYY-MM-ddの文字列

  const handleCheckbox = () => props.onChecked(task.id);
  const handleDelete = () => props.onDelete(task.id);

  const inputRef = React.useRef(null);

  const saveTaskName = () => {
    const trimmed = draftName.trim();
    if (trimmed && trimmed !== task.name) {
      props.onRename(task.id, trimmed);
    }
    setIsEditing(false);
  };

  const saveDeadline = () => {
    const value = draftDeadline;
    props.onDeadlineChange(task.id, value);
    setIsEditingDeadline(false);
  };

  // 締切が編集モードになった直後にカレンダーUIを開く
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

  return (
    <li className={`${styles.listItem}`}>
      <div className={`${styles.listItemCol} ${styles.listItemColCheckbox}`}>
        <label
          className={`${styles.checkbox} ${
            props.task.isCompleted ? styles.checkboxChecked : ""
          }`}
        >
          <input
            name="checkbox"
            type="checkbox"
            className={styles.checkboxInput}
            checked={props.task.isCompleted}
            onChange={handleCheckbox}
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
            className={styles.nameInput}
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
            onChange={(e) => setDraftDeadline(e.target.value)}
            onBlur={saveDeadline}
            autoFocus
            className={styles.deadlineInput}
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
};

export default function Lists({ taskItems, setTaskItems }) {
  // console.log(taskItems);

  const [showCompleted, setShowCompleted] = React.useState(false);

  const handleShowCompleted = (e) => {
    setShowCompleted(e.target.checked);
  };

  const handleCheckbox = (id) => {
    const target = taskItems.find((t) => t.id === id);
    if (!target) return;

    setTaskItems((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
  };

  const handleRename = (id, newName) => {
    setTaskItems((prev) =>
      prev.map((task) => (task.id === id ? { ...task, name: newName } : task)),
    );
  };

  const handleDeadlineChange = (id, deadlineString) => {
    const nextDeadline = AppDate.parse(deadlineString);
    setTaskItems((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, deadline: nextDeadline } : task,
      ),
    );
  };

  const handleDeleteAction = (id) => {
    const target = taskItems.find((task) => task.id === id);
    if (!window.confirm(`タスク「${target?.name ?? ""}」を削除しますか？`)) {
      return;
    }

    const newTasks = taskItems.filter((task) => {
      return task.id !== id;
    });

    setTaskItems(newTasks);
  };

  const tasks = taskItems
    .filter(
      (task) =>
        showCompleted || // 完了タスク表示ON → 全部表示
        // deletingTaskIds.includes(task.id) || // 削除アニメーション中 → 表示
        !task.isCompleted, // それ以外 → 未完了だけ表示
    )
    .slice() // ← sortの破壊的変更を避けるためコピー
    .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
    .map((task) => (
      <List
        key={task.id}
        task={task}
        onChecked={handleCheckbox}
        onDelete={handleDeleteAction}
        onRename={handleRename}
        onDeadlineChange={handleDeadlineChange}
      />
    ));

  return (
    <div className={styles.list}>
      <div className={styles.listSetting}>
        <label className={styles.listSettingLabel}>
          <input
            name="showCompleted"
            type="checkbox"
            className={styles.listSettingInput}
            checked={showCompleted}
            onChange={handleShowCompleted}
          />
          完了タスクを表示
        </label>
      </div>

      <div className={styles.listHeader}>
        <div className={styles.listHeaderItem}>&nbsp;</div>

        <div
          className={`${styles.listHeaderItem} ${styles.listHeaderItemName}`}
        >
          タスク
        </div>

        <div className={styles.listHeaderItem}>期限日</div>
        <div className={styles.listHeaderItem}>&nbsp;</div>
      </div>

      <ul className={styles.listItems}>{tasks}</ul>
    </div>
  );
}

"use client";

import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

import styles from "../styles/components/Lists.module.sass";

const List = (props) => {
  const { task, isDeleting, onChecked, onDelete } = props;

  const handleCheckbox = () => onChecked(task.id);
  const handleDelete = () => onDelete(task.id);

  return (
    <li
      className={`${styles.listItem} ${
        isDeleting ? styles.listItemCompletedDismissing : ""
      }`}
    >
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
        {props.task.name}
      </div>

      <div className={`${styles.listItemCol} ${styles.listItemColDeadline}`}>
        {props.task.deadline.toString()}
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
  console.log(taskItems);
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [deletingTaskIds, setDeletingTaskIds] = React.useState([]);

  const handleShowCompleted = (e) => {
    setShowCompleted(e.target.checked);
  };

  const handleCheckbox = (id) => {
    const target = taskItems.find((t) => t.id === id);
    if (!target) return;

    const becameCompleted = !target.isCompleted; // ← 先に確定

    setTaskItems((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );

    // チェック外しなら deleting を止めて終わり
    if (!becameCompleted) {
      setDeletingTaskIds((prev) => prev.filter((taskId) => taskId !== id));
      return;
    }

    // チェック付け（完了）ならフェードアウト開始
    setDeletingTaskIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setTimeout(() => {
      setDeletingTaskIds((prev) => prev.filter((taskId) => taskId !== id));
    }, 800);
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
        deletingTaskIds.includes(task.id) || // 削除アニメーション中 → 表示
        !task.isCompleted, // それ以外 → 未完了だけ表示
    )
    .slice() // ← sortの破壊的変更を避けるためコピー
    .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
    .map((task) => (
      <List
        key={task.id}
        task={task}
        isDeleting={deletingTaskIds.includes(task.id)}
        onChecked={handleCheckbox}
        onDelete={handleDeleteAction}
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

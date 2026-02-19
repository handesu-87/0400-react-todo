"use client";

import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Lists.module.sass";

const List = (props) => {
  const handleCheckbox = () => {
    props.onChecked(props.task.id);
  };

  const handleDelete = () => {
    props.onDelete(props.task.id);
  };

  return (
    <li
      className={`${styles.listItem} ${
        props.task.isDeleting ? styles.listItemCompletedDismissing : ""
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
  const [showCompleted, setShowCompleted] = React.useState(false);

  const handleShowCompleted = (e) => {
    setShowCompleted(e.target.checked);
  };

  const handleCheckbox = (id) => {
    const newTasks = taskItems.map((task) => {
      return {
        id: task.id,
        name: task.name,
        deadline: task.deadline,
        isCompleted: task.id === id ? !task.isCompleted : task.isCompleted,
        isDeleting: task.id === id ? true : task.isDeleting,
      };
    });

    setTaskItems(newTasks);

    setTimeout(() => {
      const updatedTasks = newTasks.map((task) => {
        return {
          id: task.id,
          name: task.name,
          deadline: task.deadline,
          isCompleted: task.isCompleted,
          isDeleting: false,
        };
      });

      setTaskItems(updatedTasks);
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
    .filter((task) => {
      if (showCompleted) return true;
      if (task.isDeleting) return true;
      return !task.isCompleted;
    })
    .map((task) => (
      <List
        key={task.id}
        task={task}
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

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
      className={`${styles["list__item"]} ${
        props.task.isDeleting ? styles["list__item--completed-dismissing"] : ""
      }`}
    >
      <div
        className={`${styles["list__item-col"]} ${styles["list__item-col--checkbox"]}`}
      >
        <label
          className={`${styles["checkbox"]} ${
            props.task.isCompleted ? styles["checkbox--checked"] : ""
          }`}
        >
          <input
            name="checkbox"
            type="checkbox"
            className={styles["checkbox__input"]}
            checked={props.task.isCompleted}
            onChange={handleCheckbox}
          />
          <FontAwesomeIcon
            icon={faCheck}
            className={`${styles["icon"]} ${styles["icon--check"]}`}
          />
        </label>
      </div>

      <div
        className={`${styles["list__item-col"]} ${styles["list__item-col--name"]}`}
      >
        {props.task.name}
      </div>

      <div
        className={`${styles["list__item-col"]} ${styles["list__item-col--deadline"]}`}
      >
        {props.task.deadline.toString()}
      </div>

      <div
        className={`${styles["list__item-col"]} ${styles["list__item-col--actions"]}`}
        onClick={handleDelete}
      >
        <FontAwesomeIcon
          icon={faTrash}
          className={`${styles["icon"]} ${styles["icon--trash"]}`}
        />
      </div>
    </li>
  );
};

export default function Lists({ taskItems, setTaskItems }) {
  const [showCompleted, setShowCompleted] = React.useState(false);

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
      const filteredTasks = newTasks.filter((task) => {
        return task.id !== id;
      });
      setTaskItems(filteredTasks);
    }, 300);
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

  const tasks = taskItems.map((task) => {
    console.log(task.id);
    return (
      <List
        key={task.id}
        task={task}
        onChecked={handleCheckbox}
        onDelete={handleDeleteAction}
      />
    );
  });

  return (
    <div className={styles["list"]}>
      <div className={styles["list__setting"]}>
        <label className={styles["list__setting-label"]}>
          <input
            name="show-completed"
            type="checkbox"
            className={`${styles["list__setting-input"]} ${styles["js-show-completed"]}`}
          />
          完了タスクを表示
        </label>
      </div>

      <div className={styles["list__header"]}>
        <div className={styles["list__header-item"]}>&nbsp;</div>

        <div
          className={`${styles["list__header-item"]} ${styles["list__header-item--name"]}`}
        >
          タスク
        </div>

        <div className={styles["list__header-item"]}>期限日</div>
        <div className={styles["list__header-item"]}>&nbsp;</div>
      </div>

      <ul className={`${styles["list__items"]} ${styles["js-list-container"]}`}>
        {tasks}
      </ul>
    </div>
  );
}

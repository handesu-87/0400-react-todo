"use client";

import React from "react";
import styles from "../styles/components/Lists.module.sass";
import ListItem from "./ListItem";

export default function Lists({
  taskItems,
  onChecked,
  onDelete,
  onRename,
  onDeadlineChange,
}) {
  const [showCompleted, setShowCompleted] = React.useState(false);

  const handleShowCompleted = (e) => {
    setShowCompleted(e.target.checked);
  };

  const tasks = taskItems
    // filter()が新しい配列を返してくれるので、元の配列は変更されない。
    .filter(
      (task) =>
        showCompleted || // 完了タスク表示ON → 全部表示
        !task.isCompleted, // それ以外 → 未完了だけ表示
    )
    .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
    // map()を使うときは、keyを指定する必要がある。今回は、task.idをkeyにする。
    // keyは属性であって、ListItemコンポーネントのpropではない。だから、ListItemコンポーネントの中では、keyは参照できない。
    // map()が新しい配列を返してくれるので、元の配列は変更されない。
    .map((task) => (
      <ListItem
        key={task.id}
        task={task}
        showCompleted={showCompleted}
        onChecked={onChecked}
        onDelete={onDelete}
        onRename={onRename}
        onDeadlineChange={onDeadlineChange}
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

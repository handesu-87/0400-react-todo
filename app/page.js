"use client";

import React from "react";

import Form from "./components/Form";
import Header from "./components/Header";
import Lists from "./components/Lists";

import { AppDate } from "./lib";

export default function Home() {
  const [taskItems, setTaskItems] = React.useState([
    {
      id: 0,
      name: "Task 1",
      deadline: new AppDate().getDateInXMonth(1),
      isCompleted: false,
    },
    {
      id: 1,
      name: "Task 2",
      deadline: new AppDate().getDateInXMonth(2),
      isCompleted: false,
    },
    {
      id: 2,
      name: "Task 3",
      deadline: new AppDate().getDateInXMonth(3),
      isCompleted: false,
    },
  ]);

  // 追加
  const handleAddTask = (name, deadline) => {
    const newTasks = [...taskItems];
    const maxId =
      newTasks.length > 0 ? Math.max(...newTasks.map((task) => task.id)) : -1;
    newTasks.push({
      id: maxId + 1,
      name: name,
      deadline: deadline ? new AppDate(new Date(deadline)) : new AppDate(),
      isCompleted: false,
    });
    setTaskItems(newTasks);
  };

  // 完了
  const handleToggleCompleted = (id) => {
    setTaskItems((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  // task.name更新
  const handleRename = (id, newName) => {
    setTaskItems((prev) =>
      prev.map((task) => (task.id === id ? { ...task, name: newName } : task)),
    );
  };

  // task.deadline更新
  const handleDeadlineChange = (id, newDeadlineString) => {
    setTaskItems((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, deadline: AppDate.parse(newDeadlineString) }
          : task,
      ),
    );
  };

  // 削除
  const handleDelete = (id) => {
    const target = taskItems.find((task) => task.id === id);
    if (!window.confirm(`タスク「${target?.name}」を削除しますか？`)) {
      return;
    }
    const newTasks = taskItems.filter((task) => {
      return task.id !== id;
    });
    setTaskItems(newTasks);
  };

  return (
    <>
      <Header />
      <Form onSubmit={handleAddTask} />
      <Lists
        taskItems={taskItems}
        onChecked={handleToggleCompleted}
        onRename={handleRename}
        onDeadlineChange={handleDeadlineChange}
        onDelete={handleDelete}
      />
    </>
  );
}

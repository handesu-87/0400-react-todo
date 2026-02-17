"use client";
import React from "react";
import Form from "./Form";
import Header from "./Header";
import Lists from "./Lists";
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

  const handleFormSubmit = (name, deadline) => {
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

  return (
    <>
      <Header />
      <Form onSubmit={handleFormSubmit} />
      <Lists taskItems={taskItems} setTaskItems={setTaskItems} />
    </>
  );
}

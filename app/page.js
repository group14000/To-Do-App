"use client";
import Navbar from "@/components/navbar/Navbar";
import TaskManager from "@/components/taskManager/TaskManager";
import { useState } from 'react';

export default function Home() {
  const [showCompleted, setShowCompleted] = useState(false);

  const handleShowCompleted = () => {
    setShowCompleted(true);
  };

  const handleShowPending = () => {
    setShowCompleted(false);
  };

  return (
    <>
      <Navbar onShowCompleted={handleShowCompleted} onShowPending={handleShowPending} />
      <TaskManager showCompleted={showCompleted} />
    </>
  );
}

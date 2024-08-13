import React from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskItem: React.FC<{
  task: Task;
  deleteTask: (id: number) => void;
  updateTask: (id: number, task: Task) => void;
}> = ({ task, deleteTask, updateTask }) => {
  const handleDelete = () => deleteTask(task.id);
  const handleToggleComplete = () => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  return (
    <div className="xl:flex xl:justify-center">
      <div className="border p-4 mb-2 rounded flex flex-col xl:w-4/5 xl:min-h-42 min-h-32 dark:text-white ">
        <h3 className={`text-xl ${task.completed ? "line-through " : ""}`}>
          {task.title}
        </h3>

        <p className="break-words">{task.description}</p>

        <div className="flex justify-end space-x-2 h-10 items-end sm:h-12 md:h-16 xl:h-20 ">
          <button
            onClick={handleToggleComplete}
            className="text-sm text-blue-500"
          >
            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
          <button onClick={handleDelete} className="text-sm text-red-500">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;

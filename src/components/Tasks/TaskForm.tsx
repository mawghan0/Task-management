import { useState } from "react";

const TaskForm: React.FC<{
  addTask: (title: string, description: string) => void;
}> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && description) {
      addTask(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 lg:flex lg:flex-col lg:mb-10">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded w-full lg:w-2/3 lg:self-center" 
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded w-full lg:w-2/3 lg:self-center"
      />
      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 dark:bg-slate-600 dark:hover:bg-slate-700 text-white p-2 rounded w-full lg:self-center lg:w-2/3"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;

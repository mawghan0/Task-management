import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC<{ tasks: Task[]; deleteTask: (id: number) => void; updateTask: (id: number, task: Task) => void; }> = ({ tasks, deleteTask, updateTask }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
    </div>
  );
};

export default TaskList;

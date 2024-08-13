import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TaskForm from './../components/Tasks/TaskForm';
import TaskList from './../components/Tasks/TaskList';
import Pagination from './../components/Tasks/Pagination';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get('page')) || 1;
  const initialSearch = queryParams.get('search') || '';

  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const tasksPerPage = 5;

  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (searchQuery) {
      queryParams.set('search', searchQuery);
    } else {
      queryParams.delete('search');
    }
    queryParams.set('page', currentPage.toString());

    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [searchQuery, currentPage, navigate, location.search]);

  const addTask = (title: string, description: string) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const updateTask = (id: number, updatedTask: Task) => {
    const updatedTasks = tasks.map(task => (task.id === id ? updatedTask : task));
    setTasks(updatedTasks);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4 lg:flex lg:flex-col min-h-[88.3vh]">
      <h1 className="text-2xl font-bold mb-4 lg:self-center dark:text-white">Task Management</h1>
      
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded w-full lg:w-2/3 self-center"
      />

      <TaskForm addTask={addTask} />
      
      <TaskList
        tasks={currentTasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />

      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={filteredTasks.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TasksPage;
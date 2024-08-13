import React from 'react';

const Pagination: React.FC<{ tasksPerPage: number; totalTasks: number; paginate: (pageNumber: number) => void; currentPage: number; }> = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center">
        {pageNumbers.map(number => (
          <li key={number} className={`mx-1 ${currentPage === number ? 'text-blue-500' : 'text-gray-500'}`}>
            <button onClick={() => paginate(number)} className="p-2">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

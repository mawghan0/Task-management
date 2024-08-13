import { useEffect, useState } from "react";
import { logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import light from "./../assets/light-mode.svg"
import dark from "./../assets/dark-mode.svg"

const Navbar = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleEdit = () => {
    navigate("/edit-profile");
    setDropdownOpen(!dropdownOpen);
  };

  const handleHome = () => {
    navigate("/tasks");
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-sky-600 dark:bg-slate-600 p-4">
      <div className="container mx-auto flex justify-between items-center relative h-12">
        <div onClick={handleHome} className="text-white cursor-pointer text-xl md:text-2xl">
          Task Management App
        </div>
        
        <button
          onClick={toggleTheme}
          className="bg-sky-200 absolute right-24 lg:right-32 hover:bg-sky-400 dark:bg-slate-200  dark:hover:bg-slate-400 text-white font-bold py-2 px-4 rounded"
        >
          {theme === 'light' ? <img src={light} alt="Logo" className="h-8 w-8" /> : <img src={dark} alt="Logo" className="h-8 w-8" />}
        </button>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white focus:outline-none lg:text-xl"
          >
            Hello {username}
          </button>
          {dropdownOpen && (
          <div className="absolute -right-2 top-8 mt-2 w-48 lg:top-10 bg-white border overflow-hidden border-sky-900 rounded-md shadow-lg z-10">
            <div
              onClick={handleEdit}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-200 dark:hover:bg-slate-200 cursor-pointer lg:h-12 lg:text-lg"
            >
              Profile
            </div>
            <div
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-200 dark:hover:bg-slate-200 cursor-pointer border border-t-black lg:h-12 lg:text-lg"
            >
              Logout
            </div>
          </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

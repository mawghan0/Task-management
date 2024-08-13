import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../utils/auth";
import light from "./../assets/light-mode.svg";
import dark from "./../assets/dark-mode.svg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authenticateUser(username, password)) {
      navigate("/tasks");
    } else {
      alert("Invalid credentials");
    }
  };

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-200 dark:bg-slate-500 relative">
      <button
        onClick={toggleTheme}
        className="bg-sky-200 top-16 right-28 z-10 sm:right-36 md:right-44 lg:right-56 lg:top-32 xl:right-96 hover:bg-sky-400 dark:bg-slate-200  dark:hover:bg-slate-400 text-white font-bold py-2 px-4 rounded absolute"
      >
        {theme === "light" ? (
          <img src={light} alt="Logo" className="h-8 w-8" />
        ) : (
          <img src={dark} alt="Logo" className="h-8 w-8" />
        )}
      </button>
      <form
        onSubmit={handleLogin}
        className="bg-sky-400/30 dark:bg-slate-400/30 backdrop-blur-sm p-6 xl:w-1/2 rounded shadow-xl w-2/3 h-[90vh] flex flex-col lg:h-[70vh] lg:rounded-3xl"
      >
        <h2 className="text-5xl font-extrabold self-center mt-12 text-transparent bg-black bg-clip-text h-16 md:text-6xl md:h-24 md:mb-0 lg:text-7xl lg:mt-4">
          Login
        </h2>
        <div className="lg:w-2/3 lg:self-center">
          <label className="font-bold text-xl mt-16 md:mt-12 block lg:text-2xl lg:mt-6">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="font-bold text-xl mt-4 block lg:w-2/3 lg:self-center">
          <label className="lg:text-2xl">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-600 dark:bg-slate-600 dark:hover:bg-slate-700 text-lg text-white mt-6 p-2 rounded-3xl w-56 self-center h-12 hover:bg-sky-700 lg:mt-12 lg:text-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

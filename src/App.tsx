import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import TasksPage from './pages/Tasks';
import EditProfilePage from './pages/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className='dark:bg-slate-700'>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Navbar />
                <TasksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <Navbar />
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
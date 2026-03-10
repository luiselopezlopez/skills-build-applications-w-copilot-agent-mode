import './App.css';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const navItemClassName = ({ isActive }) =>
    `nav-link px-3 fw-semibold ${isActive ? 'active' : ''}`;

  return (
    <BrowserRouter>
      <div className="app-shell container py-4 py-md-5">
        <header className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <h1 className="display-6 fw-bold text-primary mb-2">OctoFit Tracker</h1>
            <p className="text-secondary mb-0">
              Explore fitness data from the Django REST API across users, teams, activities,
              leaderboard rankings, and workouts.
            </p>
          </div>
        </header>

        <nav className="navbar navbar-expand-lg bg-white rounded-3 shadow-sm border mb-4 px-3">
          <span className="navbar-brand fw-bold text-primary">Navigation</span>
          <ul className="navbar-nav nav-pills gap-2">
            <li className="nav-item">
              <NavLink className={navItemClassName} to="/users">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navItemClassName} to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navItemClassName} to="/activities">
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navItemClassName} to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navItemClassName} to="/workouts">
                Workouts
              </NavLink>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

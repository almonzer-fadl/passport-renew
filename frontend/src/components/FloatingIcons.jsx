import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import dayIcon from '../assets/day.svg';
import nightIcon from '../assets/night.svg';
import worldIcon from '../assets/world.svg';
import logoutIcon from '../assets/logout.svg';
import { useAuth } from '../auth/AuthContext';

export function FloatingIcons() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  return (
    <div className="floating-icons">
      <button onClick={toggleTheme}>
        <img src={theme === 'light' ? nightIcon : dayIcon} alt="Theme toggle" />
      </button>
      <div className="language-dropdown">
        <button onClick={toggleLanguageDropdown}>
          <img src={worldIcon} alt="Language select" />
        </button>
        {isLanguageDropdownOpen && (
          <ul className="dropdown-menu">
            <li><a href="#">English</a></li>
            <li><a href="#">Arabic</a></li>
          </ul>
        )}
      </div>
      {location.pathname === '/home' && (
        <button onClick={logout}>
          <img src={logoutIcon} alt="Logout" />
        </button>
      )}
    </div>
  );
}
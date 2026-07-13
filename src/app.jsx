import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Menu } from './menu/menu';
import { Lobby } from './lobby/lobby';


export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">

        <header>

            <nav>
                <NavLink className="nav-link" to="/">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/menu">
                  Menu
                </NavLink>
                <NavLink className="nav-link" to="/lobby">
                  Lobby
                </NavLink>
                <NavLink className="nav-link" to="/play">
                  Play
                </NavLink>
            </nav>
            
            <h1>Battle Submarines</h1>
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/play' element={<Play />} />
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <div>
            <p> Luis Rosas </p>
            <p> <a href="https://github.com/hazor25/startup" target="_blank">GitHub</a> </p>
          </div>
          <div>
            <p>&copy; 2026 Battle Submarines. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/protectedRoutes';
import { Login } from './login/login';
import { Play } from './play/play';
import { Menu } from './menu/menu';
import { Lobby } from './lobby/lobby';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser'));
  });

  const [liveMessages, setLiveMessages] = useState([]);

  const socketRef = useRef(null);

  const sendSocketMessage = useCallback((messageObject) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log('Sending WebSocket message:', messageObject);
      socketRef.current.send(JSON.stringify(messageObject));
      return true;
    }

    console.error('WebSocket is not connected');
    return false;
  }, []);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const user = await response.json();
          localStorage.setItem('currentUser', JSON.stringify(user));
          setCurrentUser(user);
        } else {
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Failed to verify user session:', error);
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const host =
  window.location.hostname === 'localhost'
    ? 'localhost:4000'
    : window.location.host;

const socket = new WebSocket(`${protocol}://${host}`);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };


    socket.onmessage = async (event) => {
      console.log('WebSocket message received:', event.data);

      try {
        const text = event.data instanceof Blob ? await event.data.text() : event.data;
        const msg = JSON.parse(text);
        setLiveMessages((prev) => [...prev, msg]);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current = socket;

    return () => {
      if (socketRef.current === socket) {
        socketRef.current = null;
      }
      socket.close();
    };
  }, [currentUser]);

  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.href = '/';
  }

  console.log('currentUser in App:', currentUser);

  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header>
          <nav>
            {!currentUser ? (
              <NavLink to="/">Login</NavLink>
            ) : (
              <Button size="sm" variant="outline-light" onClick={logout}>
                Logout
              </Button>
            )}

            {currentUser && (
              <>
                <NavLink className="nav-link" to="/menu">
                  Menu
                </NavLink>

                <NavLink className="nav-link" to="/lobby">
                  Lobby
                </NavLink>

                <NavLink className="nav-link" to="/play">
                  Play
                </NavLink>
              </>
            )}
          </nav>

          <h1>Battle Submarines</h1>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/lobby"
            element={
              <ProtectedRoute>
                <Lobby sendSocketMessage={sendSocketMessage} liveMessages={liveMessages} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/play"
            element={
              <ProtectedRoute>
                <Play />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <div>
            <p>Luis Rosas</p>
            <p> <a href="https://github.com/hazor25/startup" target="_blank" rel="noreferrer">GitHub</a> </p>
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
  return (
    <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>
  );
}
import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { getWeatherData } from './NOAAAPI';

export function Play() {
  const sessionName = localStorage.getItem('sessionName');
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState(null);

  const [round, setRound] = useState(1);
  const [lastAction, setLastAction] = useState('Waiting...');

  const directions = ['North', 'East', 'South', 'West'];

  const [submarine, setSubmarine] = useState({
    row: 2,
    col: 2,
    depth: 2,
    direction: 0,
  });

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    async function loadWeather() {
      try {
        const forecastData = await getWeatherData();

        if (forecastData.properties?.periods) {
          setWeather(forecastData.properties.periods[0]);
        }
      } catch (error) {
        console.error('Failed to load weather:', error);
      }
    }

    loadWeather();
  }, []);

  useEffect(() => {
    async function loadGame() {
      try {
        const response = await fetch('/api/game', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const savedGame = await response.json();

          if (savedGame) {
            if (savedGame.round !== undefined) setRound(savedGame.round);
            if (savedGame.lastAction) setLastAction(savedGame.lastAction);
            if (savedGame.submarine) setSubmarine(savedGame.submarine);
          }
        }
      } catch (error) {
        console.error('Failed to load saved game:', error);
      }
    }

    loadGame();
  }, []);

  async function saveGame() {
    try {
      const response = await fetch('/api/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          sessionName,
          round,
          lastAction,
          submarine,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || 'Failed to save game');
      }
    } catch (error) {
      console.error('Failed to save game:', error);
      alert('Unable to save game');
    }
  }

  function move(action) {
    switch (action) {
      case 'left':
        setSubmarine((prev) => ({
          ...prev,
          direction: (prev.direction + 3) % 4,
        }));
        setLastAction('Turned left');
        break;

      case 'right':
        setSubmarine((prev) => ({
          ...prev,
          direction: (prev.direction + 1) % 4,
        }));
        setLastAction('Turned right');
        break;

      case 'forward':
        setSubmarine((prev) => {
          if (prev.direction % 2 === 0) {
            return { ...prev, row: prev.row + 1 };
          } else {
            return { ...prev, col: prev.col + 1 };
          }
        });
        setLastAction('Moved forward');
        break;

      case 'backwards':
        setSubmarine((prev) => {
          if (prev.direction % 2 === 0) {
            return { ...prev, row: prev.row - 1 };
          } else {
            return { ...prev, col: prev.col - 1 };
          }
        });
        setLastAction('Moved backward');
        break;

      case 'dive':
        setSubmarine((prev) => ({
          ...prev,
          depth: prev.depth + 1,
        }));
        setLastAction('Dived deeper');
        break;

      case 'up':
        setSubmarine((prev) => ({
          ...prev,
          depth: prev.depth - 1,
        }));
        setLastAction('Ascended');
        break;

      default:
        break;
    }
  }

  function attack(action) {
    switch (action) {
      case 'torpedo':
        setLastAction(`Fired ${action}`);
        break;

      case 'bomb':
        setLastAction(`Dropped ${action}`);
        break;

      case 'sam':
        setLastAction(`Fired ${action}`);
        break;

      case 'sonar':
        setLastAction(`Launched ${action}`);
        break;

      default:
        break;
    }
  }

  return (
    <main>
      <section className="game-info">
        <h4>
          Session: {sessionName} Host: {user?.username} Players: 4/8
        </h4>
        <h3>Round {round} Players remaining: 4</h3>
      </section>

      <section className="battlefield">
        <div id="ocean-background"></div>

        <h2>Battlefield</h2>
        <div className="weather-info">
          <h4>Ocean Conditions</h4>

          {weather && (
            <div className="weather-data">
              <p>Forecast: {weather.shortForecast}</p>
              <p>Temperature: {weather.temperature}°F</p>
              <p>Wind Speed: {weather.windSpeed}</p>
            </div>
          )}
        </div>

        <table>
          <tbody>
            <tr>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
            </tr>

            <tr>
              <td>[]</td>
              <td>0</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
            </tr>

            <tr>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
            </tr>

            <tr>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
            </tr>

            <tr>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
            </tr>

            <tr>
              <td>[]</td>
              <td>[]</td>
              <td>[]</td>
              <td>0</td>
              <td>[]</td>
              <td>[]</td>
            </tr>
          </tbody>
        </table>

        <div id="game-grid"></div>

        <div className="subInfo">
          <p>Depth: {submarine.depth}</p>
          <p>Facing: {directions[submarine.direction]}</p>
          <p>Position: ({submarine.row}, {submarine.col})</p>
          <p>Last Action: {lastAction}</p>
        </div>

        <Button variant="success" onClick={saveGame}>
          Save Game
        </Button>
      </section>

      <section className="controls">
        <h2>Submarine Controls</h2>

        <div className="movement-controls">
          <button onClick={() => move('left')}>Turn Left</button>
          <button onClick={() => move('forward')}>Move Forward</button>
          <button onClick={() => move('right')}>Turn Right</button>
          <button onClick={() => move('dive')}>Dive</button>
          <button onClick={() => move('backwards')}>Move Backward</button>
          <button onClick={() => move('up')}>Ascend</button>
        </div>

        <h2>Weapons</h2>

        <div className="weapon-controls">
          <button onClick={() => attack('torpedo')}>Fire Torpedo</button>
          <button onClick={() => attack('bomb')}>Drop Bomb</button>
          <button onClick={() => attack('sam')}>Fire SAM</button>
          <button onClick={() => attack('sonar')}>Launch Sonar Pulse</button>
        </div>
      </section>
    </main>
  );
}
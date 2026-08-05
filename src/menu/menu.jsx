import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export function Menu() {
  const [mode, setMode] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [sessions, setSessions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadSessions() {
      try {
        const response = await fetch('/api/sessions', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setSessions(data);
        }
      } catch (error) {
        console.error('Failed to load sessions:', error);
      }
    }

    loadSessions();
  }, []);

  async function hostGame() {
    if (!sessionName.trim()) {
      alert('Please enter a session name');
      return;
    }

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: sessionName.trim() }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Failed to create session');
        return;
      }

      localStorage.setItem('sessionName', sessionName.trim());
      navigate('/lobby');
    } catch (error) {
      console.error('Failed to create session:', error);
      alert('Failed to create session');
    }
  }


  async function joinGame(name) {
    try {
      const response = await fetch(`/api/sessions/${encodeURIComponent(name)}/join`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Failed to join session');
        return;
      }

      localStorage.setItem('sessionName', name);
      navigate('/lobby');
    } catch (error) {
      console.error('Failed to join session:', error);
      alert('Failed to join session');
    }
  }


  return (
    <main>
      <section className="welcome">
        <h2>Welcome to Battle Submarines!</h2>

        <p>
          Battle Submarines advances the classic battleship warfare experience by
          (literally) adding depth, movement, and strategy.
          Prepare for an underwater adventure as you engage in decisive battles with your opponents.
          Navigate your submarines, plan your attacks, and aim for victory!
        </p>
      </section>

      <section className="home-panels">

        <section className="host-join">
          <h2>Host or Join Game</h2>

          <div className="menu-actions">
              <Button type="button" variant="primary" onClick={() => setMode('host')}>Host Game</Button>

              <Button type="button" variant="secondary" onClick={() => setMode('join')}>Join Game</Button>
          </div>

          {mode === 'host' && (
            <div className="host-panel">
              <h3>Host Game</h3>

            <label htmlFor="gameName">Session Name</label>
            <input type="text" id="gameName" placeholder="Enter game name"
              value={sessionName} onChange={(e) => setSessionName(e.target.value)}/>

              <Button type="button" variant="light" onClick={hostGame}>Create Session</Button>
            </div>
          )}

          {mode === 'join' && (
            <div className="join-panel">
              <h3>Available Games</h3>

              <ul>
                {sessions.length === 0 ? (
                  <li>No active sessions yet</li>
                ) : (
                  sessions.map((session) => (
                    <li key={session.name}>
                      <Button
                        type="button"
                        variant="outline-light"
                        onClick={() => joinGame(session.name)}
                      >
                        {session.name} (Host: {session.host})
                      </Button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </section>

        <section className="leaderboard">
          <h2>Leaderboard</h2>
          
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Wins</th>
                <th>Kills</th>
                <th>Deaths</th>
              </tr>
            </thead>

            <tbody>
              {/* {leaderboard.map((player) => (
                <tr key={player.username}>
                  <td>{player.username}</td>
                  <td>{player.wins}</td>
                  <td>{player.kills}</td>
                  <td>{player.deaths}</td>
                </tr>
              ))} */}
            </tbody>
          </table>

        </section>

        <section className="how-to-play">
          <h2>How to Play</h2>

          <ul>
            <li>Place your submarines on your designated area of the 3D grid.</li>
            <li>Use up to 3 moves to position your submarines in 3D space.</li>
            <li>Once positioned, you can fire weapons or launch sonar pulses.</li>
            <li>Damaged submarines may have reduced capabilities.</li>
            <li>The playing area periodically shrinks until one player remains.</li>
          </ul>
          <p>Good luck and have fun!</p>
        </section>

      </section>
    </main>
  );
}
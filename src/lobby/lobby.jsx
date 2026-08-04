import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export function Lobby({ sendSocketMessage, liveMessages }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [ready, setReady] = useState(false);
  const [color, setColor] = useState('#ff0000');
  const [user, setUser] = useState(null);
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();
  const sessionName = localStorage.getItem('sessionName');


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
          setPlayers((prev) => {
            if (prev.includes(data.username)) {
              return prev;
            }
            return [...prev, data.username];
          });
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    }

    loadUser();
  }, []);


  useEffect(() => {
    if (!user) {
      return;
    }

    const joinMessage = {
      type: 'join',
      sessionName,
      username: user.username,
      text: `${user.username} joined the lobby`,
    };

    const sent = sendSocketMessage(joinMessage);

    if (sent) {
      setMessages((prev) => [...prev, joinMessage]);
    }
  }, [user, sessionName, sendSocketMessage]);


  useEffect(() => {
    if (!liveMessages || liveMessages.length === 0) {
      return;
    }

    const latest = liveMessages[liveMessages.length - 1];
    if (latest.sessionName !== sessionName) {
      return;
    }

    if (latest.type === 'chat') {
      setMessages((prev) => [...prev, latest]);
    }

    if (latest.type === 'join') {
      setPlayers((prev) => {
        if (prev.includes(latest.username)) {
          return prev;
        }
        return [...prev, latest.username];
      });
      setMessages((prev) => [...prev, latest]);
    }

    if (latest.type === 'ready') {
      setMessages((prev) => [...prev, latest]);
    }
  }, [liveMessages]);


  function leaveLobby() {
    navigate('/menu');
  }

  function sendMessage(e) {
    e.preventDefault();

    if (message.trim() === '' || !user) {
      return;
    }

    const chatMessage = {
      type: 'chat',
      sessionName,
      username: user.username,
      text: message.trim(),
    };

    const sent = sendSocketMessage(chatMessage);

    if (sent) {
      setMessages((prev) => [...prev, chatMessage]);
      setMessage('');
    }
  }

  function toggleReady() {
    const newReady = !ready;
    setReady(newReady);

    if (user) {
      const readyMessage = {
        type: 'ready',
        sessionName,
        username: user.username,
        text: `${user.username} is ${newReady ? 'ready' : 'not ready'}`,
      };

      const sent = sendSocketMessage(readyMessage);

      if (sent) {
        setMessages((prev) => [...prev, readyMessage]);
      }
    }
  }

  return (
    <main id="lobby-main">
      <section className="player-section-left">
        <section className="session-info">
          <h4>Session: {sessionName}</h4>
          <h4>Host: {user?.username || 'Loading...'}</h4>
          <h4>Players: {players.length}/8</h4>
        </section>

        <section className="players">
          <h2>Players</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </section>

        <section>
          <Button
            variant={ready ? 'success' : 'primary'}
            onClick={toggleReady}
          >
            {ready ? 'Ready!' : 'Ready'}
          </Button>

          <Button variant="secondary" onClick={leaveLobby}>
            Leave
          </Button>
        </section>

        <section className="submarine-color">
          <label htmlFor="colorPicker">Submarine Color:</label>
          <input
            type="color"
            id="colorPicker"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              localStorage.setItem('subColor', e.target.value);
            }}
          />
        </section>
      </section>

      <section className="chat-section-right">
        <section className="chat">
          <h3>Chat</h3>

          <div id="chat-box">
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.username}:</strong> {msg.text}
              </p>
            ))}
          </div>

          <form id="chat-form" onSubmit={sendMessage}>
            <label htmlFor="chatbox">Chat Message:</label>
            <input
              type="text"
              id="chatbox"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button type="submit" variant="primary">
              Send
            </Button>
          </form>
        </section>
      </section>
    </main>
  );
}
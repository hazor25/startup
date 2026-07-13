import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export function Lobby() {
  return (
    <main id="lobby-main">
            <section className="player-section-left">
                <section className="session-info">
                    <h4>Session: Alex's Game</h4>
                    <h4>Host: Alex</h4>
                    <h4>Players: 3/8</h4>
                </section>

                <section className="players">
                    <h2>Players</h2>

                    <ul>
                    <li>Alex (Host)</li>
                    <li>SeaWolf</li>
                    <li>You</li>
                    <li>Player joining...</li>
                    </ul>
                </section>

                <section>
                    <button variant="primary">Ready</button>
                    <button variant="secondary">Leave</button>
                </section>

                <section className="submarine-color">
                    <label for="colorPicker">Submarine Color:</label>
                    <input type="color" id="colorPicker" name="colorPicker" value="#ff0000"></input>
                </section>
            </section>

            <section className="chat-section-right">
                <section className="chat">
                    <h3>Chat</h3>

                    <div id="chat-box">
                        <p><strong>Alex:</strong> Welcome</p>
                        <p><strong>SeaWolf:</strong> r?</p>
                        <p><strong>You:</strong> Someone's joining</p>
                    </div>

                    <form id="chat-form">
                        <label for="chatbox">Chat Message:</label>
                        <input type="text" id="chatbox" placeholder="Type your message..." />
                        <button variant="primary">Send</button>
                    </form>
                </section>
            </section>
            
        </main>
  );
}
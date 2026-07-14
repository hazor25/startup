import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export function Lobby() {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");


    function sendMessage(message) {
        if (message === "") {
            return;
        }

        setMessages([
            ...messages,
            {
                user: localStorage.getItem("username"),
                text: message
            }
        ]);

    setMessage("");
    }

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
                    <Button variant="primary">Ready</Button>
                    <Button variant="secondary">Leave</Button>
                </section>

                <section className="submarine-color">
                    <label htmlFor="colorPicker">Submarine Color:</label>
                    <input type="color" id="colorPicker" name="colorPicker" value="#ff0000"></input>
                </section>
            </section>

            <section className="chat-section-right">
                <section className="chat">
                    <h3>Chat</h3>

                    <div id="chat-box">
                        
                    </div>

                    <form id="chat-form">
                        <label htmlFor="chatbox">Chat Message:</label>
                        <input type="text" id="chatbox" placeholder="Type your message..." 
                        value ={message} onChange={(e) => setMessage(e.target.value)}/>

                        <Button variant="primary" onClick={() => sendMessage(message)}>Send</Button>
                    </form>
                </section>
            </section>
                
        </main>
    );
}
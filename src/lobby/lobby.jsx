import React from 'react';
import {useState} from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export function Lobby() {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [ready, setReady] = useState(false);
    const [color, setColor] = useState("#ff0000");

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const sessionName = localStorage.getItem("sessionName");

    const [players, setPlayers] = useState([
    user.username,
    "SeaWolf",
    "Player 3"
]);

    function leaveLobby() {
        navigate("/menu");
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setMessages(messages => [
                ...messages,
                {
                    user: "SeaWolf",
                    text: "Ready?"
                }
            ]);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPlayers(players => [
                ...players,
                "Captain Nemo"
            ]);

        }, 6000);
        return () => clearTimeout(timer);
    }, []);


    function sendMessage(e) {
        e.preventDefault();
        if (message === "") {
            return;
        }

        setMessages(messages =>[ 
            ...messages,
            {
                user: user,
                text: message
            }
        ]);

        setMessage("");
    }

    return (
        <main id="lobby-main">
            <section className="player-section-left">
                <section className="session-info">
                    <h4>Session: {sessionName}</h4>
                    <h4>Host: {user.username}</h4>
                    <h4>Players: {players.length}/8</h4>
                </section>

                <section className="players">
                    <h2>Players</h2>

                    <ul>
                        {players.map ((player, index) => (
                            <li key={index}>{player}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <Button variant={ready ? "success" : "primary"} onClick={() => setReady(!ready)}>
                    {ready ? "Ready!" : "Ready"}</Button>

                    <Button variant="secondary" onClick={leaveLobby}>Leave</Button>
                </section>

                <section className="submarine-color">
                    <label htmlFor="colorPicker">Submarine Color:</label>
                    <input type="color" id="colorPicker" value={color} onChange={(e) => { setColor(e.target.value); localStorage.setItem("subColor", e.target.value);}}/>
                </section>
            </section>

            <section className="chat-section-right">
                <section className="chat">
                    <h3>Chat</h3>

                    <div id="chat-box">
                        {messages.map((msg, index) => (
                            <p key={index}>
                                <strong>{msg.user}:</strong> {msg.text}
                            </p>
                        ))}
                    </div>

                    <form id="chat-form" onSubmit={sendMessage}>
                        <label htmlFor="chatbox">Chat Message:</label>
                        <input type="text" id="chatbox" placeholder="Type your message..." 
                        value ={message} onChange={(e) => setMessage(e.target.value)}/>

                        <Button type="button" variant="primary" onClick={sendMessage}>Send</Button>
                    </form>
                </section>
            </section>
                
        </main>
    );
}
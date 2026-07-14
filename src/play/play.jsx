import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export function Play() {

    const sessionName = localStorage.getItem("sessionName");
    const user = JSON.parse(localStorage.getItem("user"));

    const [depth, setDepth] = useState("Surface");
    const [round, setRound] = useState(1);
    const [direction, setDirection] = useState("North");
    const [lastAction, setLastAction] = useState("Waiting...");


    function move(action) {
        switch (action) {
            case "left":
                setDirection("West");
                setLastAction("Turned Left");
                break;

            case "right":
                setDirection("East");
                setLastAction("Turned Right");
                break;

            case "forward":
                setLastAction("Moved Forward");
                break;

            case "backwards":
                setLastAction("Moved Backward");
                break;

            case "dive":
                setDepth("Deep");
                setLastAction("Dived");
                break;

            case "up":
                setDepth("Surface");
                setLastAction("Ascended");
                break;
        }
    }


  return (
    <main>

            <section className="game-info">
                <h4>Session: Alex's Game     Host: Alex     Players: 4/8</h4>
                <h3>Round 4     Players remaining: 4</h3>
            </section>
                
            <section className="battlefield">
                <h2>Battlefield</h2>
                <p>*Real ocean images will be obtained via 3rd party API and displayed as grid background*</p>
                <p>*Table will update live with client information, like when a sub is hit or radar detects movement*</p>

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

                <h3>Current Ocean Layer</h3>
                <p>Depth: Surface</p>
            </section>

            <section className="controls">
                <h2>Submarine Controls</h2>

                <div className="movement-controls">
                    <button onClick={() => move("left")}>Turn Left</button>
                    <button onClick={() => move("forward")}>Move Forward</button>
                    <button onClick={() => move("right")}>Turn Right</button>
                    <button onClick={() => move("dive")}>Dive</button>
                    <button onClick={() => move("backwards")}>Move Backward</button>
                    <button onClick={() => move("up")}>Ascend</button>
                </div>

                <h2>Weapons</h2>

                <div className="weapon-controls">
                    <button>Fire Torpedo</button>
                    <button>Drop Bomb</button>
                    <button>Fire SAM</button>
                    <button>Launch Sonar Pulse</button>
                </div>
                    
            </section>
        </main>
  );
}
import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export function Play() {

    const sessionName = localStorage.getItem("sessionName");
    const user = JSON.parse(localStorage.getItem("user"));

    const [round, setRound] = useState(1);
    const [lastAction, setLastAction] = useState("Waiting...");

    const directions = ["North", "East", "South", "West"];

    const [submarine, setSubmarine] = useState({
        row: 2,
        col: 2,
        depth: 2,
        direction: 0,
    });


    function move(action) {
        switch (action) {
            case "left":
                setSubmarine({
                    ...submarine,
                    direction: (submarine.direction - 1) % 4
                });
                break;

            case "right":
                setSubmarine({
                    ...submarine,
                    direction: (submarine.direction + 1) % 4
                });
                break;

            case "forward":
                setSubmarine({
                    ...submarine,
                    row: submarine.row+1
                });
                break;

            case "backwards":
                setSubmarine({
                    ...submarine,
                    row: submarine.row-1
                });
                break;

            case "dive":
                setSubmarine({
                    ...submarine,
                    depth: submarine.depth-1
                });
                break;

            case "up":
                setSubmarine({
                    ...submarine,
                    depth: submarine.depth+1
                });
                break;
        }
    }


        function move(action) {
        switch (action) {
            case "torpedo":
                setLastAction(`Fired ${weapon}`);
                break;

            case "bomb":
                setLastAction(`Fired ${weapon}`);
                break;

            case "sam":
                setLastAction(`Fired ${weapon}`);
                break;

            case "sonar":
                setLastAction(`Fired ${weapon}`);
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
                    <button onClick={() => attack("torpedo")}>Fire Torpedo</button>
                    <button onClick={() => attack("bomb")}>Drop Bomb</button>
                    <button onClick={() => attack("sam")}>Fire SAM</button>
                    <button onClick={() => attack("sonar")}>Launch Sonar Pulse</button>
                </div>
                    
            </section>
        </main>
  );
}
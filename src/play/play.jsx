import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { getWeatherData } from "./NOAAAPI";

export function Play() {

    const sessionName = localStorage.getItem("sessionName");
    const [user, setUser] = useState(null);

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        async function loadUser() {
            const response = await fetch("/api/user");

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        }
        loadUser();
    }, []);

    const [round, setRound] = useState(1);
    const [lastAction, setLastAction] = useState("Waiting...");

    const directions = ["North", "East", "South", "West"];

    const [submarine, setSubmarine] = useState({
        row: 2,
        col: 2,
        depth: 2,
        direction: 0,
    });

    useEffect(() => {
        async function loadWeather() {
            try {
                const forecastData = await getWeatherData();

                if (forecastData.properties?.periods) {
                    setWeather(forecastData.properties.periods[0]);
                }
            } catch (error) {
                console.error("Failed to load weather:", error);
            }
        }
        loadWeather();
    }, []);


    function move(action) {
        switch (action) {
            case "left":
                setSubmarine({
                    ...submarine,
                    direction: (submarine.direction + 3) % 4
                });
                break;

            case "right":
                setSubmarine({
                    ...submarine,
                    direction: (submarine.direction + 1) % 4
                });
                break;

            case "forward":
                if (submarine.direction % 2 == 0) {
                    setSubmarine({...submarine, row: submarine.row+1});
                } else {
                    setSubmarine({...submarine, col: submarine.col+1});
                }
                break;

            case "backwards":
                if (submarine.direction % 2 == 0) {
                    setSubmarine({...submarine, row: submarine.row-1});
                } else {
                    setSubmarine({...submarine, col: submarine.col-1});
                }
                break;

            case "dive":
                setSubmarine({
                    ...submarine,
                    depth: submarine.depth+1
                });
                break;

            case "up":
                setSubmarine({
                    ...submarine,
                    depth: submarine.depth-1
                });
                break;
        }
    }


    function attack(action) {
        switch (action) {
            case "torpedo":
                setLastAction(`Fired ${action}`);
                break;

            case "bomb":
                setLastAction(`Fired ${action}`);
                break;

            case "sam":
                setLastAction(`Fired ${action}`);
                break;

            case "sonar":
                setLastAction(`Fired ${action}`);
                break;
        }
    }


    return (
        <main>

            <section className="game-info">
                <h4>Session: {sessionName}     Host: {user?.username}    Players: 4/8</h4>
                <h3>Round {round}     Players remaining: 4</h3>
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
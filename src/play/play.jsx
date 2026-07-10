import React from 'react';

export function Play() {
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
                    <button>Turn Left</button>
                    <button>Move Forward</button>
                    <button>Turn Right</button>
                    <button>Dive</button>
                    <button>Move Backward</button>
                    <button>Ascend</button>
                </div>

                <h2>Weapons</h2>

                <div class="weapon-controls">
                    <button>Fire Torpedo</button>
                    <button>Drop Bomb</button>
                    <button>Fire SAM</button>
                    <button>Launch Sonar Pulse</button>
                </div>
                    
            </section>
        </main>
  );
}
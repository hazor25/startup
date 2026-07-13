import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export function Login() {
  return (
    <main>
      <section className="welcome">
        <h2>Welcome to Battle Submarines!</h2>

        <p>Battle Submarines advances the classic battleship warfare experience by 
            (literally) adding depth, movement, and strategy.
            Prepare for an underwater adventure as you engage in decisive battles with your opponents. 
            Navigate your submarines, plan your attacks, and aim for victory!</p>
      </section>


      <section className="home-panels">
        <section className="login">
          <h2>Login</h2>
          <form>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required placeholder="Enter your username" />
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required placeholder="Enter your password"  />
            <button variant="primary">Login</button>
            <button variant="secondary">Register</button>
          </form>
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

              <tr>
                <td>SeaWolf</td>
                <td>3</td>
                <td>8</td>
                <td>2</td>
              </tr>

              <tr>
                <td>Alasticass</td>
                <td>1</td>
                <td>3</td>
                <td>5</td>
              </tr>

              <tr>
                <td>Noobmaster69</td>
                <td>2</td>
                <td>4</td>
                <td>3</td>
              </tr>
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
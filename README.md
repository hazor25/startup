# Battle Submarines

This application is a transformation of the original battleship game, growing from 2D to 3D, as such they are submarines instead of regular ships and fire torpedoes instead of air missles. The application is built using html, css, javascript, react, mongoDB, websocket and amazon web services which allows it to host individual sessions with as many players as desired, each player recieving live updates about scores and positions as they control their submarine in round-based, synchronous combat interaction.

### Elevator pitch

We've all enjoyed the classic battleship game, whether digitized or in board-game form, but games have to evolve to stay relevant and maintain their success. That is where Battle Submarines comes in, a true advancement of what Battleship was meant to be, Battle Submarines turns 2D into 3D, slow, turn-based interaction into synchronous progression, and limited spatial decision-making into strategic movement. This application allows multiple sessions to be played at the same time with nearly unlimited players per session, meaning nearly unlimited fun.

### Design

![Design image](DemoImage.png)

Here is a sequence diagram detailing how users interact with the server to make their moves.

```mermaid
flowchart TD

    P1[Player 1]
    P2[Player 2]
    P3[Player N]

    P1 --> WEB[Battle Submarines Web Client]
    P2 --> WEB
    P3 --> WEB

    WEB --> API[AWS Game Server]

    API --> SESSION[Game Session Manager]
    SESSION --> STATE[Game State Database]

    SESSION --> PLACE[Submarine Placement Phase]
    SESSION --> ROUND[Round Processing]

    ROUND --> MOVE[Player Movement Commands]
    ROUND --> FIRE[Torpedo Fire Commands]

    MOVE --> VALIDATE[Validate Actions]
    FIRE --> VALIDATE

    VALIDATE --> STATE

    STATE --> RESULTS[Updated Positions and Damage]
    RESULTS --> WEB

    WEB --> P1
    WEB --> P2
    WEB --> P3
```

### Key features

- Secure login over https
- Ability to open and host multiple sessions
- Interface that displays and handles player interactions
- Web server that manages multiple rounds of each session
- Database that holds users and game history
- Real-time user updates between player decisions

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Structures the webpages where users will log in, join/host game sessions and view the game layout
- **CSS** - Styling to detail the structure of each webpage as well as the gameplay elements 
- **React** - Handles the rendering/animations of webpage interactions and asset movement. Will also handle user interaction with webpage and playable characters
- **Service** - AWS manages the user login/logout, player actions as a whole, game session timing and scoring. Will also use NASA API to generate game maps from actual ocean photos
- **DB/Login** - Securely stores user information, score and session history
- **WebSocket** - Live updates the positioning and status of each player to each other as well as scores and hits.

## 🚀 Specification Deliverable

For this deliverable I did the following:

- [x] I completed the prerequisites for this deliverable (Git commit requirement)
- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Rented EC2 server** - Succesfully acquired a working t3.nano server
- [x] **Leased domain name** - Purchased domain name battleship3.click
- [x] **Server accessible** from my domain: [https://battleship3.click](https://battleship3.click) - Ready for next steps

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.

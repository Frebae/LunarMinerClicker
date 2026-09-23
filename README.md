# Lunar Miner

Lunar Miner is een browser-based idle clicker game die ik heb gemaakt tijdens mijn eerste ICT challenge bij Fontys.

Het doel van dit project was niet alleen om een werkende game te maken, maar vooral om te leren hoe HTML, CSS en JavaScript samenwerken.

## Live Version

https://lunarminerclicker.freyablankert.workers.dev

## Used to build the game 

- HTML
- CSS
- JavaScript
- Git / GitHub
- Cloudflare voor hosting

## Project Structure

```text
LunarMinerClicker/
├── imagess/
│   ├── music-off.png
│   ├── music-on.png
│   ├── pickaxe.png
│   └── pixel-moon.png
├── sounds/
│   └── background.mp3
├── index.html
├── README.md
├── script.js
└── style.css

## Project Architecture

My project mainly consists of three parts: HTML, CSS and JavaScript.

- `index.html` contains the structure of the game. It includes elements such as the moon, the upgrades, the Mining Stats panel and the music button.
- `style.css` controls how the game looks. It contains the colors, positioning, animations and responsive design.
- `script.js` contains the game logic. It keeps track of the amount of Lunar Rocks, handles upgrades and controls features such as the moon particles and background music.

JavaScript connects to elements in the HTML through the DOM. For example, when the player clicks on the moon, JavaScript processes the click, changes the amount of Lunar Rocks and updates the value shown in the HTML.

CSS is then used to control how these elements look and how the animations are displayed.

The `imagess` and `sounds` folders contain the images and audio files that are used by the project.
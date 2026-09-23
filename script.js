// -------------------------
// GAME GENERAL
// -------------------------

let rocks = 0;
let rocksPerClick = 1;
let rocksPerSecond = 0;

let totalRocks = 0;
let totalClicks = 0;
let totalUpgrades = 0;


// -------------------------
// UPGRADE LEVELS
// -------------------------

let pickaxeLevel = 0;
let drillLevel = 0;
let robotLevel = 0;


// -------------------------
// UPGRADE COSTS
// These values change when an upgrade is bought.
// -------------------------

let pickaxeCost = 10;
let drillCost = 50;
let robotCost = 150;


// -------------------------
// GAME SETTINGS
// Constant values are kept in one place so they are easier to understand and change.
// -------------------------

const PICKAXE_ROCKS_PER_CLICK = 1;
const DRILL_ROCKS_PER_CLICK = 3;
const ROBOT_ROCKS_PER_SECOND = 1;

const UPGRADE_COST_MULTIPLIER = 2;
const AUTO_MINE_INTERVAL_MS = 1000;


// -------------------------
// MOON PARTICLE SETTINGS
// These constants replace the "magic numbers" that were previously inside createMoonPieces().
// -------------------------

const MOON_PIECE_COUNT = 8;
const MOON_PIECE_HORIZONTAL_RANGE = 200;
const MOON_PIECE_VERTICAL_RANGE = 120;
const MOON_PIECE_MIN_Y = 60;
const MOON_PIECE_ROTATION_RANGE = 720;
const MOON_PIECE_MIN_SIZE = 8;
const MOON_PIECE_SIZE_VARIATION = 8;
const MOON_PIECE_LIFETIME_MS = 1000;


// -------------------------
// DOM ELEMENTS
// These constants connect JavaScript to elements in the HTML.
// -------------------------

const mineButton = document.getElementById("mine-button");
const rockCount = document.getElementById("rock-count");

const rocksPerClickDisplay = document.getElementById("rocks-per-click");
const rocksPerSecondDisplay = document.getElementById("rocks-per-second");

const pickaxeButton = document.getElementById("pickaxe-button");
const drillButton = document.getElementById("drill-button");
const robotButton = document.getElementById("robot-button");

const totalRocksDisplay = document.getElementById("total-rocks");
const totalClickDisplay = document.getElementById("total-clicks");
const totalUpgradesDisplay = document.getElementById("total-upgrades");

const pickaxeAnimation = document.getElementById("pickaxe-animation");

const backgroundMusic = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");
const musicIcon = document.getElementById("music-icon");


// -------------------------
// MOON PARTICLES
// Creates temporary particles when the player clicks the moon.
// JavaScript gives each particle random values. CSS uses those values for the animation.
// -------------------------

function createMoonPieces() {
    const moonWrapper = document.querySelector(".moon-wrapper");

    for (let i = 0; i < MOON_PIECE_COUNT; i++) {
        const piece = document.createElement("span");

        piece.classList.add("moon-piece");

        const randomX =
            Math.floor(Math.random() * MOON_PIECE_HORIZONTAL_RANGE)
            - (MOON_PIECE_HORIZONTAL_RANGE / 2);

        const randomY =
            Math.floor(Math.random() * MOON_PIECE_VERTICAL_RANGE)
            + MOON_PIECE_MIN_Y;

        const randomRotation =
            Math.floor(Math.random() * MOON_PIECE_ROTATION_RANGE);

        const randomSize =
            Math.floor(Math.random() * MOON_PIECE_SIZE_VARIATION)
            + MOON_PIECE_MIN_SIZE;

        piece.style.width = randomSize + "px";
        piece.style.height = randomSize + "px";

        piece.style.setProperty("--x", randomX + "px");
        piece.style.setProperty("--y", randomY + "px");
        piece.style.setProperty("--rotation", randomRotation + "deg");

        moonWrapper.appendChild(piece);

        // Remove the particle after the animation so unused elements do not stay in the DOM.
        setTimeout(function () {
            piece.remove();
        }, MOON_PIECE_LIFETIME_MS);
    }
}


// -------------------------
// MOON CLICK
// Adds rocks, updates the statistics and starts the click animations.
// -------------------------

mineButton.addEventListener("click", function () {
    rocks = rocks + rocksPerClick;
    totalRocks = totalRocks + rocksPerClick;
    totalClicks = totalClicks + 1;

    // Only show the pickaxe animation after the player has unlocked the pickaxe.
    if (pickaxeLevel >= 1) {
        pickaxeAnimation.classList.remove("swing");

        // Forces the browser to register the removed class so the animation can restart.
        void pickaxeAnimation.offsetWidth;

        pickaxeAnimation.classList.add("swing");
    }

    rockCount.textContent = rocks;
    totalRocksDisplay.textContent = totalRocks;
    totalClickDisplay.textContent = totalClicks;

    createMoonPieces();
});


// -------------------------
// PICKAXE UPGRADE
// Each level adds +1 rock per click and doubles the cost of the next level.
// Buying the first level unlocks the drill.
// -------------------------

pickaxeButton.addEventListener("click", function () {
    if (rocks >= pickaxeCost) {
        rocks = rocks - pickaxeCost;

        pickaxeLevel = pickaxeLevel + 1;
        rocksPerClick = rocksPerClick + PICKAXE_ROCKS_PER_CLICK;

        totalUpgrades = totalUpgrades + 1;

        pickaxeCost = pickaxeCost * UPGRADE_COST_MULTIPLIER;

        rockCount.textContent = rocks;
        rocksPerClickDisplay.textContent = rocksPerClick;
        totalUpgradesDisplay.textContent = totalUpgrades;

        pickaxeButton.textContent =
            "Upgrade - Level " +
            pickaxeLevel +
            " - Cost: " +
            pickaxeCost;

        // The drill is unlocked only after the first pickaxe level.
        // drillLevel === 0 prevents the button text from being reset after later pickaxe upgrades.
        if (pickaxeLevel >= 1 && drillLevel === 0) {
            drillButton.disabled = false;
            drillButton.textContent = "Buy";
        }
    }
});


// -------------------------
// DRILL UPGRADE
// The drill requires the pickaxe to be unlocked.
// Each level adds +3 rocks per click and doubles the cost of the next level.
// Buying the first drill level unlocks the robot.
// -------------------------

drillButton.addEventListener("click", function () {
    if (
        rocks >= drillCost &&
        pickaxeLevel >= 1
    ) {
        rocks = rocks - drillCost;

        drillLevel = drillLevel + 1;
        rocksPerClick = rocksPerClick + DRILL_ROCKS_PER_CLICK;

        totalUpgrades = totalUpgrades + 1;

        drillCost = drillCost * UPGRADE_COST_MULTIPLIER;

        rockCount.textContent = rocks;
        rocksPerClickDisplay.textContent = rocksPerClick;
        totalUpgradesDisplay.textContent = totalUpgrades;

        drillButton.textContent =
            "Upgrade - Level " +
            drillLevel +
            " - Cost: " +
            drillCost;

        // The robot is unlocked only after the first drill level.
        if (drillLevel >= 1 && robotLevel === 0) {
            robotButton.disabled = false;
            robotButton.textContent = "Buy";
        }
    }
});


// -------------------------
// ROBOT UPGRADE
// The robot requires the drill to be unlocked.
// Each level adds +1 rock per second and doubles the cost of the next level.
// -------------------------

robotButton.addEventListener("click", function () {
    if (
        rocks >= robotCost &&
        drillLevel >= 1
    ) {
        rocks = rocks - robotCost;

        robotLevel = robotLevel + 1;
        rocksPerSecond = rocksPerSecond + ROBOT_ROCKS_PER_SECOND;

        totalUpgrades = totalUpgrades + 1;

        robotCost = robotCost * UPGRADE_COST_MULTIPLIER;

        rockCount.textContent = rocks;
        rocksPerSecondDisplay.textContent = rocksPerSecond;
        totalUpgradesDisplay.textContent = totalUpgrades;

        robotButton.textContent =
            "Upgrade - Level " +
            robotLevel +
            " - Cost: " +
            robotCost;
    }
});


// -------------------------
// AUTOMATIC ROCK GENERATION
// Adds rocksPerSecond to the player's balance every second.
// -------------------------

setInterval(function () {
    rocks = rocks + rocksPerSecond;
    totalRocks = totalRocks + rocksPerSecond;

    rockCount.textContent = rocks;
    totalRocksDisplay.textContent = totalRocks;
}, AUTO_MINE_INTERVAL_MS);


// -------------------------
// BACKGROUND MUSIC
// Uses one button to switch the music on and off.
// -------------------------

musicButton.addEventListener("click", function () {
    if (backgroundMusic.paused) {
        backgroundMusic.play()
            .then(function () {
                musicIcon.src = "imagess/music-on.png";
            })
            .catch(function (error) {
                console.log(
                    "Music could not play:",
                    error
                );
            });
    } else {
        backgroundMusic.pause();
        musicIcon.src = "imagess/music-off.png";
    }
});
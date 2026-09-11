let rocks = 0;
let rocksPerClick = 1;
let rocksPerSecond = 0;

let totalRocks = 0;
let totalClicks = 0;
let totalUpgrades = 0;


// Upgrade levels
let pickaxeLevel = 0;
let drillLevel = 0;
let robotLevel = 0;


// Upgrade costs
let pickaxeCost = 10;
let drillCost = 50;
let robotCost = 150;


// Game elements
const mineButton = document.getElementById("mine-button");
const rockCount = document.getElementById("rock-count");

const rocksPerClickDisplay = document.getElementById("rocks-per-click");
const rocksPerSecondDisplay = document.getElementById("rocks-per-second");


// Upgrade buttons
const pickaxeButton = document.getElementById("pickaxe-button");
const drillButton = document.getElementById("drill-button");
const robotButton = document.getElementById("robot-button");


// Stats
const totalRocksDisplay = document.getElementById("total-rocks");
const totalClickDisplay = document.getElementById("total-clicks");
const totalUpgradesDisplay = document.getElementById("total-upgrades");


// Pickaxe animation
const pickaxeAnimation = document.getElementById("pickaxe-animation");


// Music
const backgroundMusic = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");
const musicIcon = document.getElementById("music-icon");



/* -------------------------
   MOON PARTICLES
------------------------- */

function createMoonPieces() {

    const moonWrapper = document.querySelector(".moon-wrapper");

    for (let i = 0; i < 8; i++) {

        const piece = document.createElement("span");

        piece.classList.add("moon-piece");

        const randomX =
            Math.floor(Math.random() * 200) - 100;

        const randomY =
            Math.floor(Math.random() * 120) + 60;

        const randomRotation =
            Math.floor(Math.random() * 720);

        const randomSize =
            Math.floor(Math.random() * 8) + 8;


        piece.style.width = randomSize + "px";
        piece.style.height = randomSize + "px";


        piece.style.setProperty(
            "--x",
            randomX + "px"
        );

        piece.style.setProperty(
            "--y",
            randomY + "px"
        );

        piece.style.setProperty(
            "--rotation",
            randomRotation + "deg"
        );


        moonWrapper.appendChild(piece);


        // Remove particle after animation
        setTimeout(function () {

            piece.remove();

        }, 1000);
    }
}



/* -------------------------
   MOON CLICK
------------------------- */

mineButton.addEventListener("click", function () {

    rocks = rocks + rocksPerClick;

    totalRocks =
        totalRocks + rocksPerClick;

    totalClicks =
        totalClicks + 1;


    // Show pickaxe animation after first pickaxe level
    if (pickaxeLevel >= 1) {

        pickaxeAnimation.classList.remove("swing");

        void pickaxeAnimation.offsetWidth;

        pickaxeAnimation.classList.add("swing");
    }


    rockCount.textContent = rocks;

    totalRocksDisplay.textContent =
        totalRocks;

    totalClickDisplay.textContent =
        totalClicks;


    createMoonPieces();

});



/* -------------------------
   PICKAXE
------------------------- */

pickaxeButton.addEventListener("click", function () {

    if (rocks >= pickaxeCost) {

        rocks =
            rocks - pickaxeCost;

        pickaxeLevel =
            pickaxeLevel + 1;

        rocksPerClick =
            rocksPerClick + 1;


        totalUpgrades =
            totalUpgrades + 1;


        // Price doubles every level
        pickaxeCost =
            pickaxeCost * 2;


        rockCount.textContent =
            rocks;

        rocksPerClickDisplay.textContent =
            rocksPerClick;

        totalUpgradesDisplay.textContent =
            totalUpgrades;


        pickaxeButton.textContent =
            "Upgrade - Level " +
            pickaxeLevel +
            " - Cost: " +
            pickaxeCost;


        // Unlock drill after first pickaxe level
        if (pickaxeLevel >= 1 && drillLevel === 0) {

            drillButton.disabled = false;
            drillButton.textContent = "Buy";
        }
    }

});



/* -------------------------
   DRILL
------------------------- */

drillButton.addEventListener("click", function () {

    if (
        rocks >= drillCost &&
        pickaxeLevel >= 1
    ) {

        rocks =
            rocks - drillCost;

        drillLevel =
            drillLevel + 1;

        rocksPerClick =
            rocksPerClick + 3;


        totalUpgrades =
            totalUpgrades + 1;


        drillCost =
            drillCost * 2;


        rockCount.textContent =
            rocks;

        rocksPerClickDisplay.textContent =
            rocksPerClick;

        totalUpgradesDisplay.textContent =
            totalUpgrades;


        drillButton.textContent =
            "Upgrade - Level " +
            drillLevel +
            " - Cost: " +
            drillCost;


        // Unlock robot after first drill level
        if (drillLevel >= 1 && robotLevel === 0) {

            robotButton.disabled = false;
            robotButton.textContent = "Buy";
        }
    }

});



/* -------------------------
   ROBOT
------------------------- */

robotButton.addEventListener("click", function () {

    if (
        rocks >= robotCost &&
        drillLevel >= 1
    ) {

        rocks =
            rocks - robotCost;

        robotLevel =
            robotLevel + 1;

        rocksPerSecond =
            rocksPerSecond + 1;


        totalUpgrades =
            totalUpgrades + 1;


        robotCost =
            robotCost * 2;


        rockCount.textContent =
            rocks;

        rocksPerSecondDisplay.textContent =
            rocksPerSecond;

        totalUpgradesDisplay.textContent =
            totalUpgrades;


        robotButton.textContent =
            "Upgrade - Level " +
            robotLevel +
            " - Cost: " +
            robotCost;
    }

});



/* -------------------------
   AUTOMATIC ROCKS
------------------------- */

setInterval(function () {

    rocks =
        rocks + rocksPerSecond;

    totalRocks =
        totalRocks + rocksPerSecond;


    rockCount.textContent =
        rocks;

    totalRocksDisplay.textContent =
        totalRocks;

}, 1000);



/* -------------------------
   MUSIC
------------------------- */

musicButton.addEventListener("click", function () {

    if (backgroundMusic.paused) {

        backgroundMusic.play()
            .then(function () {

                musicIcon.src =
                    "imagess/music-on.png";

            })
            .catch(function (error) {

                console.log(
                    "Music could not play:",
                    error
                );

            });

    } else {

        backgroundMusic.pause();

        musicIcon.src =
            "imagess/music-off.png";
    }

});
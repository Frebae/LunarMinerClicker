let rocks = 0;
let rocksPerClick = 1;
let rocksPerSecond = 0;

let totalRocks = 0;
let totalClicks = 0;
let totalUpgrades = 0;

let pickaxeBought = false;
let drillBought = false;
let robotBought = false;

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

function createMoonPieces() {

    const moonWrapper = document.querySelector(".moon-wrapper");

    for (let i = 0; i < 8; i++) {

        const piece = document.createElement("span");

        piece.classList.add("moon-piece");

        const randomX = Math.floor(Math.random() * 200) - 100;
        const randomY = Math.floor(Math.random() * 120) + 60;
        const randomRotation = Math.floor(Math.random() * 720);

        const randomSize = Math.floor(Math.random() * 8) + 8;

        piece.style.width = randomSize + "px";
        piece.style.height = randomSize + "px";

        piece.style.setProperty("--x", randomX + "px");
        piece.style.setProperty("--y", randomY + "px");
        piece.style.setProperty("--rotation", randomRotation + "deg");

        moonWrapper.appendChild(piece);

        setTimeout(function () {
            piece.remove();
        }, 1000);
    }
}

mineButton.addEventListener("click", function () {

    rocks = rocks + rocksPerClick;

    totalRocks = totalRocks + rocksPerClick;
    totalClicks = totalClicks + 1;


    rockCount.textContent = rocks;
    totalRocksDisplay.textContent = totalRocks;
    totalClickDisplay.textContent = totalClicks;

    createMoonPieces();

});

pickaxeButton.addEventListener("click", function () {
    if (rocks >= 10 && pickaxeBought === false) {
        rocks = rocks - 10;
        rocksPerClick = rocksPerClick + 1;
        pickaxeBought = true;
        totalUpgrades = totalUpgrades + 1;
        totalUpgradesDisplay.textContent = totalUpgrades;

        rockCount.textContent = rocks;
        rocksPerClickDisplay.textContent = rocksPerClick;

        pickaxeButton.textContent = "Purchased";
        pickaxeButton.disabled = true;

        drillButton.disabled = false;
        drillButton.textContent = "Buy";
    }
});

drillButton.addEventListener("click", function () {
    if (rocks >= 50 && drillBought === false && pickaxeBought === true) {
        rocks = rocks - 50;
        rocksPerClick = rocksPerClick + 3;
        drillBought = true;
        totalUpgrades = totalUpgrades + 1;
        totalUpgradesDisplay.textContent = totalUpgrades;
    

        rockCount.textContent = rocks;
        rocksPerClickDisplay.textContent = rocksPerClick;

        drillButton.textContent = "Purchased";
        drillButton.disabled = true;

        robotButton.disabled = false;
        robotButton.textContent = "Buy";
    }
});

robotButton.addEventListener("click", function () {
    if (rocks >= 150 && robotBought === false && drillBought === true) {
        rocks = rocks - 150;
        rocksPerSecond = rocksPerSecond + 1;
        robotBought = true;
        totalUpgrades = totalUpgrades +1;
        totalUpgradesDisplay.textContent = totalUpgrades;

        rockCount.textContent = rocks;
        rocksPerSecondDisplay.textContent = rocksPerSecond;

        robotButton.textContent = "Purchased";
        robotButton.disabled = true;
    }
});

setInterval(function () {
    rocks = rocks + rocksPerSecond;
    totalRocks = totalRocks + rocksPerSecond

    rockCount.textContent = rocks;
    totalRocksDisplay.textContent = totalRocks;
    
}, 1000);
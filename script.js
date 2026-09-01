let rocks = 0;
let rocksPerClick = 1;
let rocksPerSecond = 0;

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

mineButton.addEventListener("click", function () {
    rocks = rocks + rocksPerClick;
    rockCount.textContent = rocks;
});

pickaxeButton.addEventListener("click", function () {
    if (rocks >= 10 && pickaxeBought === false) {
        rocks = rocks - 10;
        rocksPerClick = rocksPerClick + 1;
        pickaxeBought = true;

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

        rockCount.textContent = rocks;
        rocksPerSecondDisplay.textContent = rocksPerSecond;

        robotButton.textContent = "Purchased";
        robotButton.disabled = true;
    }
});

setInterval(function () {
    rocks = rocks + rocksPerSecond;
    rockCount.textContent = rocks;
}, 1000);
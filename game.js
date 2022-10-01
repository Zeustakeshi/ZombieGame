import Background from "./backgound.js";
import Cell from "./cell.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./const.js";
import ControllBar from "./controllBar.js";
import EvilWizard from "./defenders/evilWizard.js";
import Huntress from "./defenders/huntress.js";
import WizardPack from "./defenders/wizardPack.js";
import Worm from "./defenders/worm.js";
import BolbMinion from "./enemies/bolbMinion.js";
import Wiard from "./enemies/wiard.js";
import FloatMessages from "./floatMessages.js";
import Resource from "./resource.js";

class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.width = this.canvas.width = GAME_WIDTH;
        this.height = this.canvas.height = GAME_HEIGHT;
        this.position = this.canvas.getBoundingClientRect();
        this.ctx = this.canvas.getContext("2d");

        //state
        this.numberOfResources = 20000;
        this.maxNumberOfResources = this.numberOfResources;
        this.deltaTime = 0;
        this.lastTime = 0;
        this.score = 0;
        this.gameOver = false;
        this.counter = 20;
        this.maxCounter = this.counter;
        this.lastSeconds = 0;
        //mouse
        this.mouse = {
            width: 100,
            height: 100,
            x: undefined,
            y: undefined,
        };
        // cell
        this.cellSize = 100;
        this.cellGap = 3;
        this.cellGrid = [];
        //controll bar
        this.controllBar = new ControllBar(this);
        //defender
        this.defenders = [];
        // enemy
        this.enemies = [];
        this.enemyInterval = 3000;
        this.enemyTimer = 0;
        //Resources
        this.resources = [];
        this.resourceTimer = 0;
        this.resourceInterval = 15000;
        // background
        this.background = new Background(this);
        //float messages
        this.floatMessages = [];
        //handle
        this.checkMousePositon();
        this.createCells();
        this.createDefender();

        this.handleResize();
        // handle full screen
        this.fullScreenButton = document.getElementById("fullscreen");

        this.fullScreenButton.addEventListener("click", () => {
            this.toggleFullScreen();
        });
        this.update(0);
        // this.draw();
    }

    draw() {
        this.background.draw();
        this.controllBar.draw();
        this.cellGrid.forEach((cell) => cell.draw());
        this.resources.forEach((resource) => resource.draw());
        this.defenders.forEach((defender) => defender.draw());
        this.enemies.forEach((enemy) => enemy.draw());
        this.floatMessages.forEach((floatMessage) => floatMessage.draw());
    }

    update(timeStamp) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.caculateDeltaTime(timeStamp);

        this.handleDefender();
        this.handleResource();
        this.handleFloatMessage();
        if (this.counter <= 0) {
            this.colliderEnemyAndDefender();
            this.handleEnemy();
        } else {
            this.caculateCounter();
        }
        this.draw();

        if (!this.gameOver) {
            window.requestAnimationFrame(this.update.bind(this));
        } else {
            this.onGameOver();
        }
    }

    caculateDeltaTime(timeStamp) {
        this.deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
    }

    caculateCounter() {
        const currSeconds = this.getSeconds();
        if (this.lastSeconds !== currSeconds) {
            this.counter--;
            this.lastSeconds = currSeconds;
        }
    }

    handleEnemy() {
        this.enemies.forEach((enemy) => enemy.update());
        this.createEnemy();
        this.enemies = this.enemies.filter((enemy) => !enemy.makedForDeletion);
    }

    handleDefender() {
        this.defenders.forEach((defender) => defender.update());
        this.defenders = this.defenders.filter(
            (defender) => !defender.makedForDeletion
        );
    }

    handleResource() {
        this.createResource();
        this.resources = this.resources.filter(
            (resource) => !resource.makedForDeletion
        );

        this.resources.forEach((resource) => resource.update());
    }

    handleFloatMessage() {
        this.floatMessages = this.floatMessages.filter(
            (floatMessage) => floatMessage.spanLife < 50
        );

        this.floatMessages.forEach((floatMessage) => floatMessage.update());
    }

    createCells() {
        for (let i = 0; i < this.width; i += 100) {
            for (let j = 0; j < this.height; j += 100) {
                this.cellGrid.push(new Cell(this, i, j));
            }
        }
    }

    createDefender() {
        this.canvas.addEventListener("click", () => {
            this.defenderCost = this.controllBar.currentOption.cost;
            const defenderPos = {
                x: this.mouse.x - (this.mouse.x % this.cellSize),
                y: this.mouse.y - (this.mouse.y % this.cellSize),
            };
            let cellEmty = true;

            const onOverlap = this.defenders.some((defender) => {
                return (
                    defender.x === defenderPos.x + this.cellGap &&
                    defender.y === defenderPos.y + this.cellGap
                );
            });

            this.resources.forEach((resource) => {
                if (
                    resource.x - this.cellGap === defenderPos.x &&
                    resource.y - this.cellGap === defenderPos.y
                ) {
                    cellEmty = false;
                }
            });

            if (this.defenderCost > this.numberOfResources && cellEmty) {
                this.floatMessages.push(
                    new FloatMessages(
                        this,
                        `not enough resources!`,
                        this.mouse.x,
                        this.mouse.y,
                        "blue",
                        20
                    )
                );
                return;
            }

            if (
                onOverlap ||
                defenderPos.y < this.controllBar.height ||
                !cellEmty
            )
                return;

            switch (this.controllBar.currentOption.name) {
                case "EVILWIZARD":
                    this.defenders.push(
                        new EvilWizard(this, defenderPos.x, defenderPos.y)
                    );
                    break;

                case "WIZARDPACK":
                    this.defenders.push(
                        new WizardPack(this, defenderPos.x, defenderPos.y)
                    );
                    break;
                case "HUNTRESS":
                    this.defenders.push(
                        new Huntress(this, defenderPos.x, defenderPos.y)
                    );
                    break;
                case "WORM":
                    this.defenders.push(
                        new Worm(this, defenderPos.x, defenderPos.y)
                    );
                    break;
                default:
                    break;
            }
            this.defenders.sort((a, b) => a.y - b.y);
            this.numberOfResources -= this.defenderCost;
        });
    }

    createEnemy() {
        if (this.enemyTimer > this.enemyInterval) {
            if (Math.floor(this.enemyTimer) % 5 === 0) {
                this.enemies.push(new BolbMinion(this));
            }
            this.enemies.push(new Wiard(this));
            this.enemies.sort((a, b) => a.y - b.y);
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += this.deltaTime;
        }
    }

    createResource() {
        if (this.resourceTimer > this.resourceInterval) {
            this.resources.push(new Resource(this));

            this.resourceTimer = 0;
        } else {
            this.resourceTimer += this.deltaTime;
        }
    }

    checkMousePositon() {
        this.canvas.addEventListener("mousemove", (e) => {
            this.mouse.x = e.pageX - this.position.left;
            this.mouse.y = e.pageY - this.position.top;
        });

        // this.canvas.addEventListener("touchmove", (e) => {
        //     this.mouse.x = e.touches[0].pageX - this.position.left;
        //     this.mouse.y = e.touches[0].pageY - this.position.top;
        //     // this.mouse.y = this.cellSize;
        // });

        this.canvas.addEventListener("mouseleave", () => {
            this.mouse.x = undefined;
            this.mouse.y = undefined;
        });
    }

    collider(obj1, obj2) {
        return (
            obj1.x <= obj2.x &&
            obj1.x >= obj2.x - obj1.width &&
            obj1.y <= obj2.y &&
            obj1.y >= obj2.y - obj1.height
        );
    }

    colliderEnemyAndDefender() {
        if (this.defenders.length <= 0) return;
        this.enemies.forEach((enemy) => {
            this.defenders.forEach((defender) => {
                if (this.collider(defender, enemy)) {
                    if (defender.health > enemy.dame) {
                        enemy.speed = 0;
                    } else {
                        enemy.speed = enemy.movement;
                    }

                    defender.health -= enemy.dame;
                }
            });
        });
    }

    onGameOver() {
        this.ctx.save();
        this.ctx.font = `600 50px Markazi`;
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#fbbf24";
        this.ctx.fillRect(
            this.width * 0.5 - this.width * 0.25,
            this.height * 0.5 - this.height * 0.25,
            this.width * 0.5,
            this.height * 0.5
        );
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText("GAME OVER!", this.width * 0.5, this.height * 0.5);
        this.ctx.fillStyle = "#000";
        this.ctx.fillText(
            "GAME OVER!",
            this.width * 0.5 + 8,
            this.height * 0.5 + 5
        );
        this.ctx.font = `600 30px Markazi`;
        this.ctx.fillText(
            `Your score is: ${this.score}`,
            this.width * 0.5 + 8,
            this.height * 0.5 + 50
        );
        this.ctx.restore();

        this.canvas.addEventListener("click", () => {
            if (this.gameOver) {
                this.handleResetGame();
                this.update(0);
            }
        });
    }

    handleResetGame() {
        this.numberOfResources = this.maxNumberOfResources;
        this.deltaTime = 0;
        this.lastTime = 0;
        this.counter = this.maxCounter;
        this.score = 0;
        this.defenders = [];
        this.enemies = [];
        this.enemyTimer = 0;
        this.resources = [];
        this.resourceTimer = 0;
        this.floatMessages = [];
        this.gameOver = false;
    }

    handleResize() {
        window.addEventListener("resize", () => {
            this.position = this.canvas.getBoundingClientRect();
        });
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) {
            this.canvas.requestFullscreen().catch((err) => {
                alert(`Error , can't enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    getSeconds() {
        const d = new Date();
        return d.getSeconds();
    }
}

window.addEventListener("load", () => {
    const btnPlay = document.getElementById("button-play");
    btnPlay.addEventListener("click", () => {
        const g = new Game();
        btnPlay.style.display = "none";
    });
});

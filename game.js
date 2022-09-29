import Defender, { EvilWizard, Huntress, WizardPack } from "./defender.js";
import Cell from "./cell.js";
import Enemy, { Zombie } from "./enemy.js";
import Resource from "./resource.js";
import FloatMessages from "./floatMessages.js";
import ControllBar from "./controllBar.js";
import Background from "./backgound.js";

class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.width = this.canvas.width = 1200;
        this.height = this.canvas.height = 600;
        this.position = this.canvas.getBoundingClientRect();
        this.ctx = this.canvas.getContext("2d");

        //state
        this.numberOfResources = 10000;
        this.deltaTime = 0;
        this.lastTime = 0;
        this.score = 0;
        this.gameOver = false;
        //mouse
        this.mouse = {
            width: 0.1,
            height: 0.1,
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
        this.defenderCost = 200;
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
        this.createEnemy();
        this.createDefender();
        this.handleResize();

        // handle full screen
        this.fullScreenButton = document.getElementById("fullscreen");

        this.fullScreenButton.addEventListener("click", () => {
            this.toggleFullScreen();
        });

        //update
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
        this.deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        this.colliderEnemyAndDefender();

        this.defenders.forEach((defender) => defender.update());
        this.enemies.forEach((enemy) => enemy.update());
        // this.resources.forEach((resource) => resource.update());

        this.createEnemy();
        this.createResource();
        this.resources = this.resources.filter(
            (resource) => !resource.makedForDeletion
        );

        this.defenders = this.defenders.filter(
            (defender) => defender.health > 0
        );

        this.enemies = this.enemies.filter(
            (enemy) => enemy.health > 0 && !enemy.makedForDeletion
        );
        this.floatMessages = this.floatMessages.filter(
            (floatMessage) => floatMessage.spanLife < 50
        );

        this.floatMessages.forEach((floatMessage) => floatMessage.update());
        this.resources.forEach((resource) => resource.update());
        this.draw();
        window.requestAnimationFrame(this.update.bind(this));
    }

    createCells() {
        for (let i = 0; i < this.width; i += 100) {
            for (let j = this.cellSize; j < this.height; j += 100) {
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
                default:
                    break;
            }
            this.numberOfResources -= this.defenderCost;
        });
    }

    createEnemy() {
        if (this.enemyTimer > this.enemyInterval) {
            this.enemies = this.enemies.filter(
                (enemy) => !enemy.makedForDeletion
            );
            this.enemies.push(new Zombie(this));
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
            this.mouse.x = e.x - this.position.left;
            this.mouse.y = e.y - this.position.top;
        });

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

                    if (defender.health - enemy.dame <= 1) {
                        setTimeout(() => {
                            defender.health -= enemy.dame;
                        }, 400);
                    } else {
                        defender.health -= enemy.dame;
                    }
                }
            });
        });
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
}

const g = new Game();

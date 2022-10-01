import FloatMessages from "../floatMessages.js";

export default class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width + this.game.cellGap;
        this.y =
            Math.random() * (this.game.height - this.game.controllBar.height) +
            this.game.controllBar.height;
        this.y = this.y - (this.y % this.game.cellSize) + this.game.cellGap;
        this.width = this.game.cellSize - this.game.cellGap;
        this.height = this.game.cellSize - this.game.cellGap;
        this.makedForDeletion = false;
        this.speed = Math.random() * 0.8 + 0.2;
        this.movement = this.speed;
        this.dame = 1;
        this.health = 1000;
        this.maxHealth = this.health;
        this.timer = 0;
        this.fps = 10;
        this.interval = 1000 / this.fps;

        this.states = [];
        this.currentState = this.states[0];

        this.img = new Image();
        this.rootSrc = "";
        this.img.src = `${this.rootSrc}/Run.png`;

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 7;
        this.maxFrameY = 0;
        this.spriteWidth = this.game.cellSize;
        this.spriteHeight = this.game.cellSize;
        this.scale = 1;
        this.padding = 10;
        this.skills = [];
    }

    draw() {
        this.game.ctx.fillStyle = "#000";
        this.game.ctx.font = "600 28px Markazi";
        this.game.ctx.fillText(this.health, this.x + this.width / 4, this.y);
        this.game.ctx.drawImage(
            this.img,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x - this.padding * this.scale,
            this.y - this.padding * this.scale,
            this.spriteWidth * this.scale,
            this.spriteHeight * this.scale
        );
    }

    update() {
        this.x -= this.speed;
        if (this.health <= 0) {
            this.speed = 0;
            setTimeout(() => {
                this.makedForDeletion = true;
            }, 500);
        }
        if (this.x + this.width <= 0) {
            this.makedForDeletion = true;
            this.game.gameOver = true;
        }

        this.currentState.handleChangeState();

        if (this.timer > this.interval) {
            this.frameX < this.maxFrameX ? this.frameX++ : (this.frameX = 0);
            this.frameY < this.maxFrameY ? this.frameY++ : (this.frameY = 0);
            this.timer = 0;
        } else {
            this.timer += this.game.deltaTime;
        }

        if (this.health <= 0 && this.makedForDeletion) {
            this.game.numberOfResources += this.maxHealth * 0.5;
            this.game.score += 1;
            this.game.floatMessages.push(
                new FloatMessages(
                    this.game,
                    `+${this.maxHealth * 0.5}`,
                    this.x,
                    this.y + this.height * 0.5,
                    "red",
                    30
                )
            );
        }
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}

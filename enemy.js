import FloatMessages from "./floatMessages.js";

class Enemy {
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

        this.img = new Image();
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 7;
        this.maxFrameY = 0;
        this.SpriteWidth = this.game.cellSize;
        this.SpriteHeight = this.game.cellSize;
    }

    draw() {
        this.game.ctx.fillStyle = "#000";
        this.game.ctx.font = "600 28px Markazi";
        this.game.ctx.fillText(this.health, this.x + this.width / 4, this.y);
        this.game.ctx.drawImage(
            this.img,
            this.frameX * this.SpriteWidth,
            this.frameY * this.SpriteHeight,
            this.SpriteWidth,
            this.SpriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update() {
        this.x -= this.speed;
        if (this.x < 0) {
            this.makedForDeletion = true;
        }

        if (this.timer > this.interval) {
            this.frameX < this.maxFrameX ? this.frameX++ : (this.frameX = 0);
            this.frameY < this.maxFrameY ? this.frameY++ : (this.frameY = 0);
            this.timer = 0;
        } else {
            this.timer += this.game.deltaTime;
        }

        if (this.health < 1) {
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
}

export class Zombie extends Enemy {
    constructor(game) {
        super(game);
        this.img.src = "assets/zombie.png";
        this.maxFrame = 7;
        this.SpriteWidth = 292;
        this.SpriteHeight = 410;
        this.health = 10000;
    }
}

export default Enemy;

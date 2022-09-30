import FloatMessages from "./floatMessages.js";

class Resource {
    constructor(game) {
        this.game = game;
        this.x = Math.random() * this.game.width;
        this.x = this.x - (this.x % this.game.cellSize) + this.game.cellGap;
        this.y =
            Math.random() * (this.game.height - this.game.controllBar.height) +
            this.game.controllBar.height;
        this.y = this.y - (this.y % this.game.cellSize) + this.game.cellGap;

        this.width = this.game.cellSize - this.game.cellGap;
        this.height = this.game.cellSize - this.game.cellGap;

        this.values = [50, 80, 100, 200];
        this.value = Math.floor(Math.random() * this.values.length);
        this.makedForDeletion = false;

        this.img = new Image();
        this.img.src = "assets/resources/Chests.png";
        this.spriteWidth = 48;
        this.spriteHeight = 32;
        this.frameX = 0;
        this.frameY = this.value * 2;
        this.maxFrameX = 4;
        this.maxFrameY = 7;
        this.timer = 0;
        this.fps = 10;
        this.interval = 1000 / this.fps;

        this.handleClick();
        this.states = ["OPEN", "CLOSE"];
        this.currentState = this.states[1];
    }

    draw() {
        this.game.ctx.drawImage(
            this.img,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
        // this.game.ctx.font = "600 28px Markazi";
        // this.game.ctx.fillStyle = "red";
        // this.game.ctx.fillText(this.value, this.x, this.y);
    }

    update() {
        if (this.timer > this.interval) {
            this.frameX < this.maxFrameX ? this.frameX++ : (this.frameX = 0);
            this.timer = 0;
        } else {
            this.timer += this.game.deltaTime;
        }
    }

    handleClick() {
        this.game.canvas.addEventListener("click", () => {
            if (this.makedForDeletion) return;
            if (this.game.collider(this, this.game.mouse)) {
                this.game.numberOfResources += this.values[this.value];
                this.game.floatMessages.push(
                    new FloatMessages(
                        this.game,
                        `+${this.values[this.value]}`,
                        this.x,
                        this.y,
                        "red",
                        30
                    )
                );
                if (this.currentState === this.states[1]) {
                    this.frameY++;
                    this.frameX = 0;
                }
                setTimeout(() => {
                    this.makedForDeletion = true;
                }, 400);
            }
        });
    }
}

export default Resource;

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
        this.value =
            this.values[Math.floor(Math.random() * (this.values.length - 1))];

        this.makedForDeletion = false;

        this.img = new Image();
        this.img.src = "assets/resource.png";
        this.spriteWidth = 120;
        this.spriteHieght = 107;
        this.frameX = 0;
        this.maxFrame = 3;
        this.timer = 0;
        this.fps = 20;
        this.interval = 1000 / this.fps;

        this.handleClick();
    }

    draw() {
        this.game.ctx.fillStyle = "green";
        // this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.drawImage(
            this.img,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHieght,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.game.ctx.font = "600 28px Markazi";
        this.game.ctx.fillStyle = "red";
        this.game.ctx.fillText(this.value, this.x, this.y);
    }

    update() {
        if (this.timer > this.interval) {
            this.frameX < this.maxFrame ? this.frameX++ : (this.frameX = 0);
            this.timer = 0;
        } else {
            this.timer += this.game.deltaTime;
        }
    }

    handleClick() {
        this.game.canvas.addEventListener("click", () => {
            if (this.makedForDeletion) return;
            if (this.game.collider(this, this.game.mouse)) {
                this.game.numberOfResources += this.value;
                this.game.floatMessages.push(
                    new FloatMessages(
                        this.game,
                        `+${this.value}`,
                        this.x,
                        this.y,
                        "red",
                        30
                    )
                );
                this.makedForDeletion = true;
            }

            // this.game.cellGrid.forEach((cell) => {
            //     if (
            //         cell.x === this.x  &&
            //         cell.y === this.y - this.game.cellGap
            //     ) {
            //         cell.emty = true;
            //     }
            // });
        });
    }
}

export default Resource;

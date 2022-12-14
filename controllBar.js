import { DEFENDER } from "./const.js";

class ControllBar {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.cellSize;
        this.statusWidth = this.game.cellSize * 2;
        this.options = [];
        this.currentOption = this.options[0];
        this.counter = 20;
        this.lastSeconds = 0;
        this.playBtn = new ButtonPlay(this.game);
        this.handeOptionDefender();
    }

    draw() {
        // this.game.ctx.fillStyle = "#059669";
        this.game.ctx.font = "500 28px Markazi";
        // this.game.ctx.fillRect(0, 0, this.width, this.height);
        this.drawStatus();
        this.options.forEach((option) => option.draw());
        this.drawCounter(
            this.game.width - this.game.cellSize,
            this.game.cellSize * 0.5
        );
        this.playBtn.draw();
    }

    drawCounter(x, y) {
        this.game.ctx.save();
        this.game.ctx.font = `600 24px Markazi`;
        this.game.ctx.textAlign = "center";

        this.game.ctx.fillStyle = "#fff";
        this.game.ctx.fillText(`⏰: ${this.game.counter}`, x, y);
        this.game.ctx.restore();
    }

    drawStatus() {
        this.game.ctx.fillStyle = "#fff";
        this.game.ctx.font = `600 24px Markazi`;
        this.game.ctx.fillText(
            `Resources: ${this.game.numberOfResources}`,
            20,
            35,
            this.statusWidth
        );
        this.game.ctx.fillText(
            `Score: ${this.game.score}`,
            20,
            68,
            this.statusWidth
        );
    }

    handeOptionDefender() {
        for (const [, character] of Object.entries(DEFENDER)) {
            this.options.push(
                new Option(
                    this.game,
                    this.game.cellSize * (character.id + 2) + this.game.cellGap,
                    this.game.cellGap,
                    character.spriteWidth,
                    character.spriteHeight,
                    `${character.rootSrc}/Idle.png`,
                    character.cost,
                    character.name
                )
            );
        }

        this.currentOption = this.options[0];
    }
}

class Option {
    constructor(game, x, y, spriteWidth, spriteHeight, src, cost, name) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = this.game.cellSize - this.game.cellGap;
        this.height = this.game.cellSize - this.game.cellGap;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.img = new Image();
        this.img.src = src;
        this.cost = cost;
        this.name = name;
        this.handleSelect();
    }

    draw() {
        const currOpt = this.game.controllBar.currentOption;
        if (this.game.collider(this, this.game.mouse) || currOpt === this) {
            this.game.ctx.strokeStyle = "blue";
            this.game.ctx.lineWidth = 3;
            this.game.ctx.strokeRect(
                this.x,
                this.y,
                this.game.cellSize - this.game.cellGap,
                this.game.cellSize - this.game.cellGap
            );
        }

        this.game.ctx.drawImage(
            this.img,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );

        this.game.ctx.lineWidth = 1;
        this.game.ctx.fillStyle = "#fff";
        this.game.ctx.font = "500 20px Markazi";
        this.game.ctx.fillText(
            this.cost,
            this.x + this.width * 0.5 - 15,
            this.y + this.height - 5,
            this.game.cellSize
        );
    }

    handleSelect() {
        this.game.canvas.addEventListener("click", () => {
            if (this.game.collider(this, this.game.mouse)) {
                this.game.controllBar.currentOption = this;
                console.log("dsa");
            }
        });
    }
}

class ButtonPlay {
    constructor(game, x, y) {
        this.game = game;
        this.x =
            this.game.width - (this.game.cellSize + this.game.cellGap) * 2 - 20;
        this.y = 0;
        this.width = this.game.cellSize - this.game.cellGap;
        this.height = this.game.cellSize - this.game.cellGap;
        this.onClick();
    }

    draw() {
        this.game.ctx.save();
        this.game.ctx.font = `600 24px Markazi`;
        this.game.ctx.textAlign = "center";
        // this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.fillText(
            `play`,
            this.x + this.game.cellSize * 0.5,
            this.y + this.game.cellSize * 0.5
        );
        this.game.ctx.restore();
    }

    onClick() {
        this.game.canvas.addEventListener("click", () => {
            if (this.game.collider(this, this.game.mouse)) {
                console.log("asd");
                this.game.counter = 0;
            }
        });
    }
}

export default ControllBar;

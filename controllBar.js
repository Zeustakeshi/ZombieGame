class ControllBar {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.cellSize;
        this.statusWidth = this.game.cellSize * 2;
        this.options = [];
        this.currentOption = this.options[0];
        this.handeOptionDefender();
    }

    draw() {
        // this.game.ctx.fillStyle = "#059669";
        this.game.ctx.font = "500 28px Markazi";
        // this.game.ctx.fillRect(0, 0, this.width, this.height);
        this.drawStatus();
        this.options.forEach((option) => option.draw());
    }

    drawStatus() {
        this.game.ctx.fillStyle = "#fff";
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
        const options = [
            {
                name: "HUNTRESS",
                src: "assets/defenders/Huntress 2/Idle.png",
                width: 100,
                height: 100,
                cost: 500,
            },
            {
                name: "WORM",
                src: "assets/defenders/Worm/Idle.png",
                width: 90,
                height: 90,
                cost: 1000,
            },
            {
                name: "EVILWIZARD",
                src: "assets/defenders/EVil Wizard 2/Idle.png",
                width: 250,
                height: 250,
                cost: 1800,
            },
            {
                name: "WIZARDPACK",
                src: "assets/defenders/Wizard Pack/Idle.png",
                width: 231,
                height: 190,
                cost: 2000,
            },
        ];

        options.forEach((option, index) => {
            this.options.push(
                new Option(
                    this.game,
                    this.game.cellSize * (index + 3) + this.game.cellGap,
                    this.game.cellGap,
                    option.width,
                    option.height,
                    option.src,
                    option.cost,
                    option.name
                )
            );
        });

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
            }
        });
    }
}

export default ControllBar;

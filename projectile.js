class Projectile {
    constructor(game, charater, x, y, scale, padding) {
        this.game = game;
        this.charater = charater;

        this.dame = this.charater.dame;
        this.speed = 5;
        this.makedForDeletion = false;

        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = `${this.charater.rootSrc}/Move.png`;
        this.timer = 0;
        this.fps = 20;
        this.interval = 1000 / this.fps;
        this.frameX = 0;
        this.maxFrame = 2;
        this.scale = scale;
        this.padding = padding;
    }

    draw(maxFrame, spriteWidth, spriteHeight) {
        this.maxFrame = maxFrame;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;

        this.width = spriteWidth * this.scale;
        this.height = spriteHeight * this.scale;

        this.game.ctx.drawImage(
            this.img,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x - this.padding * this.scale,
            this.y - this.padding * this.scale,
            this.width,
            this.height
        );
    }

    update() {
        if (this.timer > this.interval) {
            this.frameX < this.maxFrame ? this.frameX++ : (this.frameX = 0);
            this.timer = 0;
        } else {
            this.timer += this.game.deltaTime;
        }

        this.x += this.speed;
        if (this.x + this.width > this.game.width) {
            this.makedForDeletion = true;
        }
    }
}

export default Projectile;

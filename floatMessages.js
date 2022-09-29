class FloatMessages {
    constructor(game, value, x, y, color, size) {
        this.game = game;
        this.value = value;
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.opacity = 1;
        this.spanLife = 0;
    }

    update() {
        this.y -= 0.6;
        this.spanLife++;
        this.opacity -= 0.01;
    }

    draw() {
        this.game.ctx.save();
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.globalAlpha = this.opacity;
        this.game.ctx.font = `600 ${this.size}px Markazi`;
        this.game.ctx.fillText(this.value, this.x, this.y);
        this.game.ctx.restore();
    }
}

export default FloatMessages;

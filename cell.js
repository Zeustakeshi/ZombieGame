class Cell {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = this.game.cellSize;
        this.height = this.game.cellSize;
        this.emty = true;
    }

    draw() {
        if (this.game.collider(this, this.game.mouse)) {
            this.game.ctx.strokeStyle = "black";
            this.game.ctx.strokeRect(
                this.x + this.game.cellGap,
                this.y + this.game.cellGap,
                this.width - this.game.cellGap,
                this.height - this.game.cellGap
            );
        }
    }
}

export default Cell;

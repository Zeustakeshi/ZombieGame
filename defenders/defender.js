import Projectile from "../projectile.js";

class Defender {
    constructor(game, x, y) {
        this.game = game;
        this.x = x + this.game.cellGap;
        this.y = y + this.game.cellGap;
        this.width = this.game.cellSize - this.game.cellGap;
        this.height = this.game.cellSize - this.game.cellGap;
        this.health = 100;
        this.projectiles = [];

        this.timer = 0;
        this.fps = 20;
        this.interval = 1000 / this.fps;

        this.isAtk = false;
        this.atkSpeed = 0.2;
        this.atkTimer = 0;
        this.atkInterval = 1000 / (this.atkSpeed * this.fps);

        this.attackRange = this.x + this.game.width * 0.5;
        this.dame = 20;
        this.slowEnemy = 0;
        this.makedForDeletion = false;

        this.states = [];
        this.currentState = this.states[0];

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 1;
        this.maxFrameY = 0;
        this.spriteWidth = this.game.cellSize;
        this.spriteHeight = this.game.cellSize;
        this.rootSrc = "";
        this.img = new Image();
        this.img.src = `${this.rootSrc}/Idle.png`;
        this.padding = 80;
        this.scale = 1;
        this.projectileDetail = {
            padding: 0,
            maxFrame: 30,
            spriteWidth: 18,
            spriteHeight: 19,
            scale: 3,
        };
        this.lastSeconds = this.getSeconds();
    }

    draw() {
        const context = this.game.ctx;
        context.fillStyle = "blue";
        // this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(
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
        context.fillStyle = "red";
        context.font = "600 20px Markazi";
        context.fillText(
            Math.floor(this.health),
            this.x + this.width * 0.5 - 30,
            this.y
        );

        this.projectiles.forEach((projectile) =>
            projectile.draw(
                this.projectileDetail.maxFrame,
                this.projectileDetail.spriteWidth,
                this.projectileDetail.spriteHeight
            )
        );
    }

    getSeconds() {
        const d = new Date();
        return d.getSeconds();
    }

    update() {
        if (this.health <= 0) {
            setTimeout(() => {
                this.makedForDeletion = true;
            }, 400);
        }
        this.isAtk = this.game.enemies.some(
            (enemy) =>
                enemy.y > this.y - this.game.cellGap &&
                enemy.y + enemy.height <
                    this.y + this.height + this.game.cellGap
            //      &&
            // enemy.x < this.x + this.attackRange
        );

        this.currentState.handleChangeState();

        if (this.atkTimer > this.atkInterval) {
            if (this.isAtk) {
                this.createProjectile();
            }
            this.atkTimer = 0;
        } else {
            this.atkTimer += this.game.deltaTime;
        }

        if (this.timer > this.interval) {
            this.frameX < this.maxFrameX ? this.frameX++ : (this.frameX = 0);
            this.frameY < this.maxFrameY ? this.frameY++ : (this.frameY = 0);

            this.timer = 0;
        } else {
            this.timer += this.game.deltaTime;
        }

        if (this.projectiles.length > 0) {
            this.colliderEnemyAndProjectile();
            this.projectiles = this.projectiles.filter(
                (projectile) => !projectile.makedForDeletion
            );
            this.projectiles.forEach((projectile) => projectile.update());
        }
    }

    createProjectile() {
        if (this.frameX >= Math.floor(this.maxFrameX * 0.5)) {
            this.projectiles.push(
                new Projectile(
                    this.game,
                    this,
                    this.projectileDetail.x,
                    this.projectileDetail.y,
                    this.projectileDetail.scale,
                    this.projectileDetail.padding
                )
            );
        }
    }

    colliderEnemyAndProjectile() {
        this.projectiles.forEach((projectile) => {
            this.game.enemies.forEach((enemy) => {
                if (this.game.collider(enemy, projectile)) {
                    if (enemy.health > 0) {
                        enemy.health -= projectile.dame;
                    }
                    // enemy.health -= projectile.dame;
                    projectile.makedForDeletion = true;
                    enemy.speed -= enemy.speed * this.slowEnemy;
                }
            });
        });
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}

export default Defender;

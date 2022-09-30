import {
    Atk1Defender,
    Atk2Defender,
    DieDefender,
    IdleDefender,
} from "./states.js";
import Projectile from "./projectile.js";

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
        this.fps = 18;
        this.interval = 1500 / this.fps;
        this.isAtk = false;
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
            maxFrame: 30,
            spriteWidth: 18,
            spriteHeight: 19,
        };
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
                    this.y + this.height + this.game.cellGap &&
                enemy.x < this.attackRange
        );

        this.currentState.handleChangeState();

        if (this.timer > this.interval) {
            if (this.isAtk) {
                this.createProjectile();
            }
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
        if (Math.floor(this.timer) % 5 !== 0) return;

        this.projectiles.push(
            new Projectile(
                this.game,
                this,
                this.projectileDetail.x,
                this.projectileDetail.y
            )
        );
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

export class EvilWizard extends Defender {
    constructor(game, x, y) {
        super(game, x, y);
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.rootSrc = "assets/defenders/EVil Wizard 2";
        this.img.src = `${this.rootSrc}/Idle.png`;
        this.states = [
            new IdleDefender(this, 7, 0),
            new Atk1Defender(this, 7, 0),
            new Atk2Defender(this, 7, 0),
            new DieDefender(this, 6, 0),
        ];
        this.currentState = this.states[0];
        this.maxFrameX = 7;
        this.maxFrameY = 0;
        this.dame = 80;
        this.attackRange = this.x + this.game.width * 0.4;
        this.health = 100;
        this.padding = 80;
        this.scale = 1.1;
        this.projectileDetail = {
            x: this.x + this.width,
            y: this.y,
            maxFrame: 30,
            spriteWidth: 18,
            spriteHeight: 19,
        };
    }
}

export class WizardPack extends Defender {
    constructor(game, x, y) {
        super(game, x, y);
        this.spriteWidth = 231;
        this.spriteHeight = 190;
        this.rootSrc = "assets/defenders/Wizard Pack";
        this.img.src = `${this.rootSrc}/Idle.png`;
        this.states = [
            new IdleDefender(this, 5, 0),
            new Atk1Defender(this, 7, 0),
            new Atk2Defender(this, 7, 0),
            new DieDefender(this, 6, 0),
        ];
        this.currentState = this.states[0];
        this.maxFrameX = 5;
        this.maxFrameY = 0;
        this.dame = 100;
        this.attackRange = this.x + this.game.width * 0.25;
        this.health = 200;
        this.padding = 50;
        this.scale = 1;

        this.projectileDetail = {
            x: this.x + this.width,
            y: this.y,
            maxFrame: 30,
            spriteWidth: 18,
            spriteHeight: 19,
        };
    }
}

export class Huntress extends Defender {
    constructor(game, x, y) {
        super(game, x, y);
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.rootSrc = "assets/defenders/Huntress 2";
        this.img.src = `${this.rootSrc}/Idle.png`;
        this.states = [
            new IdleDefender(this, 9, 0),
            new Atk1Defender(this, 5, 0),
            new Atk2Defender(this, 5, 0),
            new DieDefender(this, 9, 0),
        ];
        this.currentState = this.states[0];
        this.maxFrameX = 9;
        this.maxFrameY = 0;
        this.dame = 5;
        this.slowEnemy = 0.009;
        this.health = 80;

        this.padding = 20;
        this.scale = 2;
        this.fps = 20;
        this.interval = 1000 / this.fps;

        this.projectileDetail = {
            x: this.x + this.width,
            y: this.y + this.height / 2 - 10,
            maxFrame: 0,
            spriteWidth: 24,
            spriteHeight: 5,
        };
    }
}

export default Defender;

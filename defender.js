import {
    Atk1Defender,
    Atk2Defender,
    DieDefender,
    IdleDefender,
} from "./states.js";
import Projectile from "./projectile.js";
import { DEFENDER } from "./const.js";

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
                    this.y + this.height + this.game.cellGap &&
                enemy.x < this.x + this.attackRange
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

        this.dame = DEFENDER.huntress.dame;
        this.slowEnemy = DEFENDER.huntress.slowEnemy;
        this.health = DEFENDER.huntress.health;
        this.attackRange = DEFENDER.huntress.attackRange;
        this.atkSpeed = DEFENDER.huntress.attackSpeed;
        this.atkInterval = 1000 / (this.atkSpeed * this.fps);

        this.padding = 20;
        this.scale = 2;

        this.projectileDetail = {
            padding: 0,
            x: this.x + this.width,
            y: this.y + this.height / 2 - 10,
            maxFrame: 0,
            spriteWidth: 24,
            spriteHeight: 5,
            scale: 3,
        };
    }
}

export class Worm extends Defender {
    constructor(game, x, y) {
        super(game, x, y);
        this.spriteWidth = 90;
        this.spriteHeight = 90;
        this.rootSrc = "assets/defenders/Worm";
        this.img.src = `${this.rootSrc}/Idle.png`;
        this.states = [
            new IdleDefender(this, 8, 0),
            new Atk1Defender(this, 15, 0),
            new Atk2Defender(this, 15, 0),
            new DieDefender(this, 8, 0),
        ];
        this.currentState = this.states[0];
        this.maxFrameX = 8;
        this.maxFrameY = 0;

        this.dame = DEFENDER.worm.dame;
        this.attackRange = DEFENDER.worm.attackRange;
        this.health = DEFENDER.worm.health;
        this.slowEnemy = DEFENDER.worm.slowEnemy;
        this.atkSpeed = DEFENDER.worm.attackSpeed;
        this.atkInterval = 1000 / (this.atkSpeed * this.fps);

        this.padding = 10;
        this.scale = 1.8;
        this.projectileDetail = {
            padding: 10,
            x: this.x + this.width,
            y: this.y,
            maxFrame: 5,
            spriteWidth: 46,
            spriteHeight: 46,
            scale: 3,
        };
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

        this.dame = DEFENDER.evilWizard.dame;
        this.attackRange = DEFENDER.evilWizard.attackRange;
        this.health = DEFENDER.evilWizard.health;
        this.slowEnemy = DEFENDER.evilWizard.slowEnemy;
        this.atkSpeed = DEFENDER.evilWizard.attackSpeed;
        this.atkInterval = 1000 / (this.atkSpeed * this.fps);

        this.padding = 80;
        this.scale = 1.1;
        this.projectileDetail = {
            padding: 0,
            x: this.x + this.width,
            y: this.y,
            maxFrame: 30,
            spriteWidth: 18,
            spriteHeight: 19,
            scale: 3,
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

        this.dame = DEFENDER.wizardPack.dame;
        this.attackRange = DEFENDER.wizardPack.attackRange;
        this.health = DEFENDER.wizardPack.health;
        this.slowEnemy = DEFENDER.wizardPack.slowEnemy;
        this.atkSpeed = DEFENDER.wizardPack.attackSpeed;
        this.atkInterval = 1000 / (this.atkSpeed * this.fps);

        this.padding = 50;
        this.scale = 1;

        this.projectileDetail = {
            padding: 10,
            x: this.x + this.width,
            y: this.y,
            maxFrame: 60,
            spriteWidth: 66,
            spriteHeight: 66,
            scale: 1.2,
        };
    }
}

export default Defender;

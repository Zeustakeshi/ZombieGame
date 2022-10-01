import { DEFENDER } from "../const.js";

import Defender from "./defender.js";
import Atk1Defender from "./states/atk1.js";
import Atk2Defender from "./states/atk2.js";
import DieDefender from "./states/die.js";
import IdleDefender from "./states/idle.js";

export default class Huntress extends Defender {
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

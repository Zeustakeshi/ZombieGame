import { DEFENDER } from "../const.js";
import Atk1Defender from "./states/atk1.js";
import Atk2Defender from "./states/atk2.js";
import DieDefender from "./states/die.js";
import IdleDefender from "./states/idle.js";
import Defender from "./defender.js";

export default class Worm extends Defender {
    constructor(game, x, y) {
        super(game, x, y);
        this.spriteWidth = DEFENDER.worm.spriteHeight;
        this.spriteHeight = DEFENDER.worm.spriteWidth;
        this.rootSrc = DEFENDER.worm.rootSrc;
        this.img.src = `${this.rootSrc}/Idle.png`;
        this.skills = DEFENDER.worm.skills;

        this.health = DEFENDER.worm.health;
        this.skills = DEFENDER.worm.skills;
        this.states = [
            new IdleDefender(this, 8, 0),
            new Atk1Defender(this, 15, 0),
            new Atk2Defender(this, 15, 0),
            new DieDefender(this, 8, 0),
        ];
        this.currentState = this.states[0];
        this.maxFrameX = 8;
        this.maxFrameY = 0;
        this.attackRange = this.checkAtkRange();

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

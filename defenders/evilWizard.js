import { DEFENDER } from "../const.js";
import Atk1Defender from "./states/atk1.js";
import Atk2Defender from "./states/atk2.js";
import DieDefender from "./states/die.js";
import IdleDefender from "./states/idle.js";
import Defender from "./defender.js";

export default class EvilWizard extends Defender {
    constructor(game, x, y) {
        super(game, x, y);
        this.spriteWidth = DEFENDER.evilWizard.spriteHeight;
        this.spriteHeight = DEFENDER.evilWizard.spriteWidth;
        this.rootSrc = DEFENDER.evilWizard.rootSrc;
        this.img.src = `${this.rootSrc}/Idle.png`;

        this.health = DEFENDER.evilWizard.health;
        this.skills = DEFENDER.evilWizard.skills;
        this.states = [
            new IdleDefender(this, 7, 0),
            new Atk1Defender(this, 7, 0),
            new Atk2Defender(this, 7, 0),
            new DieDefender(this, 6, 0),
        ];
        this.currentState = this.states[0];
        this.maxFrameX = 7;
        this.maxFrameY = 0;
        this.attackRange = this.checkAtkRange();

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

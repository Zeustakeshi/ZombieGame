import { DEFENDER } from "../const.js";
import Atk1Defender from "./states/atk1.js";
import Atk2Defender from "./states/atk2.js";
import DieDefender from "./states/die.js";
import IdleDefender from "./states/idle.js";
import Defender from "./defender.js";

export default class WizardPack extends Defender {
    constructor(game, x, y) {
        super(game, x, y);
        this.spriteWidth = DEFENDER.wizardPack.spriteWidth;
        this.spriteHeight = DEFENDER.wizardPack.spriteHeight;
        this.rootSrc = DEFENDER.wizardPack.rootSrc;
        this.img.src = `${this.rootSrc}/Idle.png`;

        this.health = DEFENDER.wizardPack.health;
        this.skills = DEFENDER.wizardPack.skills;
        this.states = [
            new IdleDefender(this, 5, 0),
            new Atk1Defender(this, 7, 0),
            new Atk2Defender(this, 7, 0),
            new DieDefender(this, 6, 0),
        ];
        this.currentState = this.states[0];
        this.maxFrameX = 5;
        this.maxFrameY = 0;
        this.attackRange = this.checkAtkRange();

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

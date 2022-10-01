import { DEFENDER } from "../const.js";
import Atk1Defender from "./states/atk1.js";
import Atk2Defender from "./states/atk2.js";
import DieDefender from "./states/die.js";
import IdleDefender from "./states/idle.js";
import Defender from "./defender.js";

export default class WizardPack extends Defender {
    constructor(game, x, y) {
        super(game, x, y);
        this.spriteWidth = 231;
        this.spriteHeight = 190;
        this.rootSrc = "assets/defenders/Wizard Pack";
        this.img.src = `${this.rootSrc}/Idle.png`;

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

import Enemy from "./enemy.js";
import DieEnemy from "./states/die.js";
import RunEnemy from "./states/run.js";
import { ENEMY } from "../const.js";

export default class Wiard extends Enemy {
    constructor(game) {
        super(game);
        this.rootSrc = "assets/enemies/wizard";
        this.img.src = `${this.rootSrc}/Run.png`;
        this.maxFrameX = 2;
        this.spriteWidth = 80;
        this.spriteHeight = 80;
        this.fps = 5;
        this.interval = 1000 / this.fps;
        this.scale = 1.5;
        this.padding = 12;
        this.states = [
            null,
            null,
            null,
            new DieEnemy(this, 9, 0),
            new RunEnemy(this, 2, 0),
        ];
        this.currentState = this.states[4];
        this.health = ENEMY.wiard.health;
        this.dame = ENEMY.wiard.dame;
        this.speed = ENEMY.wiard.speed;
        this.movement = this.speed;
    }
}

import { ENEMY } from "../const.js";
import Enemy from "./enemy.js";
import DieEnemy from "./states/die.js";
import RunEnemy from "./states/run.js";

export default class BolbMinion extends Enemy {
    constructor(game) {
        super(game);
        this.rootSrc = "assets/enemies/blob-minion";
        this.img.src = `${this.rootSrc}/Run.png`;
        this.maxFrameX = 7;
        this.spriteWidth = 80;
        this.spriteHeight = 40;
        this.fps = 10;
        this.interval = 1000 / this.fps;
        this.scale = 2;
        this.padding = -8;
        this.states = [
            null,
            null,
            null,
            new DieEnemy(this, 5, 0),
            new RunEnemy(this, 7, 0),
        ];
        this.currentState = this.states[4];
        this.health = ENEMY.bolbMinion.health;
        this.dame = ENEMY.bolbMinion.dame;
        this.speed = ENEMY.bolbMinion.speed;
        this.movement = this.speed;
    }
}

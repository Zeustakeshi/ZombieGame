export const states = {
    IDLE: 0,
    ATK1: 1,
    ATK2: 2,
    DIE: 3,
    RUN: 4,
};

export default class State {
    constructor(state, character, maxFrameX, maxFrameY) {
        this.state = state;
        this.character = character;
        this.maxFrameX = maxFrameX;
        this.maxFrameY = maxFrameY;
        this.characterSkills = this.character.skills;
    }
    enter() {
        this.character.maxFrameX = this.maxFrameX;
        this.character.maxFrameY = this.maxFrameY;
    }

    handleChangeState() {}
}

export class Idle extends State {
    constructor(character, maxFrameX, maxFrameY) {
        super("IDLE", character, maxFrameX, maxFrameY);
    }
}

export class Atk extends State {
    constructor(state, character, maxFrameX, maxFrameY) {
        super(state, character, maxFrameX, maxFrameY);
    }
}

export class DefnederAtk extends State {
    constructor(state, character, maxFrameX, maxFrameY, skill) {
        super(state, character, maxFrameX, maxFrameY);
        this.skill = this.character.skills[skill];
    }

    enter() {
        super.enter();
        this.character.img.src = `${this.character.rootSrc}/${this.skill.src}`;
        this.character.dame = this.skill.dame;
        this.character.attackRange = this.skill.attackRange;
        this.character.slowEnemy = this.skill.slowEnemy;
        this.character.attackSpeed = this.skill.attackSpeed;
    }
}

export class Die extends State {
    constructor(character, maxFrameX, maxFrameY, src) {
        super("DIE", character, maxFrameX, maxFrameY, src);
    }
    enter() {
        this.character.img.src = `${this.character.rootSrc}/Death.png`;
    }
}

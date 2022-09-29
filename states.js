const states = {
    IDLE: 0,
    ATK1: 1,
    ATK2: 2,
    DIE: 3,
};

class State {
    constructor(state, character, maxFrameX, maxFrameY) {
        this.state = state;
        this.character = character;
        this.maxFrameX = maxFrameX;
        this.maxFrameY = maxFrameY;
    }
    enter() {
        this.character.maxFrameX = this.maxFrameX;
        this.character.maxFrameY = this.maxFrameY;
    }

    handleChangeState() {}
}

class Idle extends State {
    constructor(character, maxFrameX, maxFrameY) {
        super("IDLE", character, maxFrameX, maxFrameY);
    }
}

class Atk extends State {
    constructor(character, maxFrameX, maxFrameY) {
        super("ATK", character, maxFrameX, maxFrameY);
        4;
    }
}

class Die extends State {
    constructor(character, maxFrameX, maxFrameY, src) {
        super("DIE", character, maxFrameX, maxFrameY, src);
    }
}

export class IdleDefender extends Idle {
    constructor(character, maxFrameX, maxFrameY, src) {
        super(character, maxFrameX, maxFrameY, src);
    }

    enter() {
        super.enter();
        this.character.img.src = `${this.character.rootSrc}/Idle.png`;
    }

    handleChangeState() {
        if (this.character.isAtk) {
            this.character.setState(states.ATK1);
        } else if (this.character.health < 10) {
            this.character.setState(states.DIE);
        }
    }
}

export class Atk1Defender extends Atk {
    constructor(character, maxFrameX, maxFrameY) {
        super(character, maxFrameX, maxFrameY);
    }

    enter() {
        super.enter();
        this.character.img.src = `${this.character.rootSrc}/Attack1.png`;
    }

    handleChangeState() {
        if (!this.character.isAtk) {
            this.character.setState(states.IDLE);
        } else if (this.character.health < 10) {
            this.character.setState(states.DIE);
        } else {
            this.character.game.enemies.forEach((enemy) => {
                if (this.character.game.collider(this.character, enemy)) {
                    this.character.setState(states.ATK2);
                }
            });
        }
    }
}

export class Atk2Defender extends Atk {
    constructor(character, maxFrameX, maxFrameY) {
        super(character, maxFrameX, maxFrameY);
    }

    enter() {
        super.enter();
        this.character.img.src = `${this.character.rootSrc}/Attack2.png`;
    }

    handleChangeState() {
        if (!this.character.isAtk) {
            this.character.setState(states.IDLE);
        } else if (this.character.health < 10) {
            this.character.setState(states.DIE);
        }
    }
}

export class DieDefender extends Die {
    constructor(character, maxFrameX, maxFrameY) {
        super(character, maxFrameX, maxFrameY);
    }

    enter() {
        super.enter();
        this.character.img.src = `${this.character.rootSrc}/Death.png`;
    }
}

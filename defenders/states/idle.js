import { Idle, states } from "../../state.js";

export default class IdleDefender extends Idle {
    constructor(character, maxFrameX, maxFrameY, src) {
        super(character, maxFrameX, maxFrameY, src);
    }

    enter() {
        super.enter();
        this.character.img.src = `${this.character.rootSrc}/Idle.png`;
    }

    handleChangeState() {
        if (this.character.isAtk) {
            this.character.game.enemies.forEach((enemy) => {
                if (enemy.x < this.characterSkills[0]?.attackRange) {
                    this.character.setState(states.ATK2);
                } else {
                    this.character.setState(states.ATK1);
                }
            });
        } else if (this.character.health < 1) {
            this.character.setState(states.DIE);
        }
    }
}

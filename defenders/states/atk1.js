import { DefnederAtk, states } from "../../state.js";

export default class Atk1Defender extends DefnederAtk {
    constructor(character, maxFrameX, maxFrameY) {
        super("ATK1", character, maxFrameX, maxFrameY, 0);
    }

    enter() {
        super.enter();
    }

    handleChangeState() {
        if (!this.character.isAtk) {
            this.character.setState(states.IDLE);
        } else if (this.character.health < 1) {
            this.character.setState(states.DIE);
        } else if (this.character.isAtk) {
            this.character.game.enemies.forEach((enemy) => {
                if (
                    enemy.x <=
                    this.characterSkills[1]?.attackRange + this.character.x
                ) {
                    this.character.setState(states.ATK2);
                }
            });
        }
    }
}

import { Atk, states } from "../../state.js";

export default class Atk1Defender extends Atk {
    constructor(character, maxFrameX, maxFrameY) {
        super("ATK1", character, maxFrameX, maxFrameY);
    }

    enter() {
        super.enter();
        this.skill = this.characterSkills[0];
        this.character.img.src = `${this.character.rootSrc}/${this.skill.src}`;
        this.character.dame = this.skill.dame;
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

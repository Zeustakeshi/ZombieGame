import { Atk, states } from "../../state.js";

export default class Atk2Defender extends Atk {
    constructor(character, maxFrameX, maxFrameY) {
        super("ATK2", character, maxFrameX, maxFrameY);
    }

    enter() {
        super.enter();
        this.skill = this.characterSkills[1];
        this.character.img.src = `${this.character.rootSrc}/${this.skill.src}`;
        this.character.dame = this.skill.dame;
    }

    handleChangeState() {
        if (!this.character.isAtk) {
            this.character.setState(states.IDLE);
        } else if (this.character.health < 1) {
            this.character.setState(states.DIE);
        }
    }
}

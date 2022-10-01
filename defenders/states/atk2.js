import { DefnederAtk, states } from "../../state.js";

export default class Atk2Defender extends DefnederAtk {
    constructor(character, maxFrameX, maxFrameY) {
        super("ATK2", character, maxFrameX, maxFrameY, 1);
    }

    enter() {
        super.enter();
    }

    handleChangeState() {
        if (!this.character.isAtk) {
            this.character.setState(states.IDLE);
        } else if (this.character.health < 1) {
            this.character.setState(states.DIE);
        }
    }
}

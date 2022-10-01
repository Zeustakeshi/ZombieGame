import State, { states } from "../../state.js";

export default class RunEnemy extends State {
    constructor(character, maxFrameX, maxFrameY) {
        super("RUN", character, maxFrameX, maxFrameY);
    }

    enter() {
        super.enter();
        this.character.img.src = `${this.character.rootSrc}/Run.png`;
    }
    handleChangeState() {
        if (this.character.health < 1) {
            this.character.setState(states.DIE);
        }
    }
}

import { Die } from "../../state.js";

export default class DieEnemy extends Die {
    constructor(character, maxFrameX, maxFrameY) {
        super(character, maxFrameX, maxFrameY);
    }
    enter() {
        this.character.img.src = `${this.character.rootSrc}/Death.png`;
    }
}

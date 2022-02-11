import Actor from "./actor.js"; 

class Gizmo extends Actor {
    constructor(isActive, start_pos_x, start_pos_y, height, width) {
        super(start_pos_x, start_pos_y, width, height);
        this.isActive = isActive;
        this.is_floor = false;
    }
}

export default Gizmo;
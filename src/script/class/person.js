import Actor from "./actor.js";

class Person extends Actor {
    constructor(start_pos_x, start_pos_y, height, width, max_acceleration, y_acceleration) {
        super(start_pos_x, start_pos_y, width, height);
        this.max_acceleration = max_acceleration;
        this.y_acceleration = y_acceleration;
        this.is_jumping = false;
    }
}

export default Person;
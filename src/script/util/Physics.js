import { ACCELERATION_OF_GRAVITY, X_SPEED } from "./Constants.js";

export function jump(obj, start_x, start_y, t) { 
    obj.start_pos_y = start_y - t * obj.y_acceleration + (ACCELERATION_OF_GRAVITY * t * t) / 2;
}

export function leftCollision(objects, obj) {

    for (let i in objects) {
        // console.log(obj.start_pos_x + obj.width);
        // console.log(objects[i].start_pos_x);
        if (obj.start_pos_x + obj.width <= objects[i].start_pos_x + X_SPEED && obj.start_pos_x + obj.width >= objects[i].start_pos_x && obj.start_pos_y + obj.height > objects[i].start_pos_y + objects[i].height /*&& obj.start_pos_y + obj.height < objects[i].start_pos_y + objects[i].height*/ && !objects[i].is_floor) {
            // console.log("LEFT COLLISION!");
            return objects[i];
        }
    }
    // console.log("-------------------");
    return null;
}

export function upperCollision(objects, obj) {
    for (let i in objects) {
        if (obj.start_pos_y + obj.height >= objects[i].start_pos_y && obj.start_pos_y + obj.height <= objects[i].start_pos_y + 5 && (obj.start_pos_x + obj.width * 0.7 >= objects[i].start_pos_x && obj.start_pos_x + obj.width * 0.3 <= objects[i].start_pos_x + objects[i].width) && !objects[i].is_floor) {
            console.log("UPPER COLLISION!");
            console.log(objects[i]);
            return objects[i];
        }
    }
    // console.log("-------------------");
    return null;
}


export function rightCollision(objects, obj) {
    for (let i in objects) {
        // console.log("++++++++++");
        // console.log(obj.start_pos_x);
        // console.log(objects[i].start_pos_x + objects[i].width);
        // console.log("-------------------");
        if (obj.start_pos_x >= objects[i].start_pos_x + objects[i].width - X_SPEED && obj.start_pos_x <= objects[i].start_pos_x + objects[i].width && obj.start_pos_y + obj.height > objects[i].start_pos_y + objects[i].height /*&& obj.start_pos_y + obj.height < objects[i].start_pos_y + objects[i].height*/ && !objects[i].is_floor) {
            // console.log("RIGHT COLLISION!");
            return objects[i];
        }
    }
    return null;
}
import KeyControls from "./controls/KeyControls.js";
import MouseControls from "./controls/MouseControls.js";
import Person from "./class/person.js";
import { X_SPEED } from "./util/Constants.js";
import { jump, leftCollision, upperCollision, rightCollision } from "./util/Physics.js";
import Gizmo from "./class/gizmo.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const key_controller = new KeyControls();

let main_character = new Person(60, 328, 73, 62, 1.3, 29.6);

let smth = new Gizmo(true, 400, 396, -10, 30);
let smth_1 = new Gizmo(true, 490, 396, -70, 30);
let floor = new Gizmo(false, 0, 396, 5, 640);
floor.is_floor = true;

let object_on_the_scene = [];
object_on_the_scene.push(smth);
object_on_the_scene.push(floor);
object_on_the_scene.push(smth_1);

let is_dead = false;
let current_time_jumping = 0;

let current_floor = floor.start_pos_y - main_character.height + 5;
let current_right_wall = canvas.width;
let current_left_wall = 0;

function gameLoop(t) {
    if (!is_dead) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#000000";
        context.fillRect(floor.start_pos_x, floor.start_pos_y, floor.width, floor.height);
        context.fillStyle = "#F653DA";
        context.fillRect(smth.start_pos_x, smth.start_pos_y, smth.width, smth.height);
        context.fillStyle = "#F653DA";
        context.fillRect(smth_1.start_pos_x, smth_1.start_pos_y, smth_1.width, smth_1.height);
        context.fillStyle = "#000000";
        context.fillText("X: " + main_character.start_pos_x, 500, 50, 100, 10);
        context.fillText("X - ширина: " + (main_character.start_pos_x + main_character.width), 500, 70, 100, 10);
        context.fillText("Y: " + main_character.start_pos_y, 500, 90, 100, 10);
        context.fillText("Y - низ: " + (main_character.start_pos_y + main_character.height), 500, 110, 100, 10);
        if (key_controller.yAxisDirection == -1 && !main_character.is_jumping) {
            main_character.is_jumping = true;   
        }

        if (main_character.is_jumping) {
            jump(main_character, 0, current_floor, current_time_jumping);
            current_time_jumping += 0.1;
        }

        main_character.start_pos_x += key_controller.xAxisDirection * X_SPEED;

        
        let object_with_left_collision = leftCollision(object_on_the_scene, main_character);
        if (object_with_left_collision) {
            current_right_wall = object_with_left_collision.start_pos_x;
        } else {
            current_right_wall = canvas.width;
        }


        let object_with_upper_collision = upperCollision(object_on_the_scene, main_character);
        if (object_with_upper_collision) {
            console.log(object_with_upper_collision);
            console.log(current_floor);
            current_floor = object_with_upper_collision.start_pos_y + object_with_upper_collision.height - main_character.height + 2;
            // console.log(current_floor);
        } else {
            // jump(main_character, )
            current_floor = floor.start_pos_y - main_character.height + 5;
        }

        let object_with_right_collision = rightCollision(object_on_the_scene, main_character);
        if (object_with_right_collision) {
            current_left_wall = object_with_right_collision.start_pos_x + object_with_right_collision.width;
        } else {
            current_left_wall = 0;
        }

        
        if (main_character.start_pos_x < current_left_wall) {
            main_character.start_pos_x = current_left_wall;
        }
        if (main_character.start_pos_x > current_right_wall - 65) {
            main_character.start_pos_x = current_right_wall - 65;
        }
        if (main_character.start_pos_y < 0) {
            main_character.start_pos_y = 0;
        }
        if (main_character.start_pos_y > current_floor) {
            main_character.start_pos_y = current_floor;
            main_character.is_jumping = false;
            current_time_jumping = 0;
        }
        if (main_character.start_pos_y > canvas.height - 75) {
            main_character.start_pos_y = canvas.height - 75;
        }
    }
    const img = new Image();
    img.src = "src/assets/images/ugu.png";
    context.drawImage(img, main_character.start_pos_x, main_character.start_pos_y);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
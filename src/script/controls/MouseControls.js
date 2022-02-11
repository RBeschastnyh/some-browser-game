class MouseControls {

    constructor(dom) {
        this.dom = dom || document.body;
        this.position = {x: 0, y: 0};
        // this.isPressed = false; //TODO: зощем
        this.isMoved = false;
        this.isDown = false;
    }
}

export default MouseControls;
class KeyControls {
    constructor() {
        this.keys = {};
        document.addEventListener('keydown', (event) => {
            console.dir(event);
            if (["ArrowRight", "ArrowUp", "ArrowDown", "ArrowLeft"].indexOf(event.key) >= 0) {
                event.preventDefault();
            }
            this.keys[event.key] = true;
        });

        document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });
    }

    get action() {
        return this.keys['KeyF'];
    }

    get xAxisDirection() {
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            return -1;
        }

        if (this.keys['ArrowRight'] || this.keys['d']) {
            return 1;
        }
        return 0;
    }

    get yAxisDirection() {
        if (this.keys['ArrowUp'] || this.keys['w']) {
            return -1;
        }

        if (this.keys['ArrowDown'] || this.keys['s']) {
            return 1;
        }
        return 0;
    }

    reset() {
        for (let key in this.keys) {
          this.keys[key] = false;
        }
      }
}

export default KeyControls;
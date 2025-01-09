export default class Input {
    constructor() {
        this.lastKey = '';
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'd':
                    this.lastKey = 'PRESS d';
                    break
                case 'a':
                    this.lastKey = 'PRESS a';
                    break
                case 'w':
                    this.lastKey = 'PRESS w';
                    break
                case 's':
                    this.lastKey = 'PRESS s';
                    break
            }
        });
        window.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'd':
                    this.lastKey = 'RELEASE d';
                    break
                case 'a':
                    this.lastKey = 'RELEASE a';
                    break
                case 'w':
                    this.lastKey = 'RELEASE w';
                    break
                case 's':
                    this.lastKey = 'RELEASE s';
                    break
            }
        });
    }
}
export class Input {
    constructor(game) {
        this.game = game;
        this.keys = [];

        window.addEventListener('keydown', (e) => {
            if ((e.key === 's' ||
                 e.key === 'w' ||
                 e.key === 'a' ||
                 e.key === 'd' ||
                 e.key === ' ' ||
                 e.key === 'Shift'
                ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
            else if (e.key === 'q') this.game.debug = !this.game.debug;
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === 's' ||
                e.key === 'w' ||
                e.key === 'a' ||
                e.key === 'd' ||
                e.key === ' ' ||
                e.key === 'Shift') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}
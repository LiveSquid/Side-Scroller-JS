import { Player } from './player.js';
import { Input } from './input.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.player = new Player(this); 
            this.input = new Input();
        }
        update(deltaTime) {
            this.player.update(this.input.keys, deltaTime);
        }
        draw(ctx) {
            this.player.draw(ctx);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    
    let lastTime = 0
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.draw(ctx);
        game.update(deltaTime);

        requestAnimationFrame(animate);
    }
    animate(0);
});
import { Player } from './player.js';
import { Input } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemey, ClimbingEnemy } from './enemies.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 83;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this); 
            this.player = new Player(this); 
            this.input = new Input();
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
        }
        update(deltaTime) {
            this.player.update(this.input.keys, deltaTime);
            this.background.update();

            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            }
            else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.delete) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }); 
        }
        draw(ctx) {
            this.background.draw(ctx);
            this.player.draw(ctx);

            this.enemies.forEach(enemy => {
                enemy.draw(ctx);
            }); 
        }
        addEnemy() {
            this.enemies.push(new FlyingEnemy(this));
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
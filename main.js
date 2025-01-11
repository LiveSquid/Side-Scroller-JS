import { Player } from './player.js';
import { Input } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemey, ClimbingEnemy } from './enemies.js';
import { UI } from './UI.js';

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
            this.input = new Input(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.lives = 3;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;
    

            this.player.update(this.input.keys, deltaTime);
            this.background.update(deltaTime);

            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy(deltaTime);
                this.enemyTimer = 0;
            }
            else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            }); 

            this.particles.forEach((particle, index) => {
                particle.update(deltaTime);
            });

            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });

            this.enemies = this.enemies.filter(enemy => !enemy.delete);
            this.particles = this.particles.filter(particle => !particle.delete);
            this.collisions = this.collisions.filter(collision => !collision.delete);
        }
        draw(ctx) {
            this.background.draw(ctx);
            this.player.draw(ctx);
            

            this.enemies.forEach(enemy => {
                enemy.draw(ctx);
            }); 

            this.particles.forEach(particle => {
                particle.draw(ctx);
            }); 

            this.collisions.forEach((collisions, index) => {
                collisions.draw(ctx);
            });

            this.UI.draw(ctx);
        }
        addEnemy(deltaTime) {
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemey(this));
            else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    
    let lastTime = 0
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});
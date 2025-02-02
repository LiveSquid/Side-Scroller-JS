import {Sitting, Running, Jumping, Falling, Rolling, Diving, Hit} from "./playerStates.js";
import { CollisionAnimation } from "./collisionAnimation.js";

export class Player {
    constructor(game) {
        this.game = game
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.frameX = 0;
        this.frameY = 0;
        this.image = document.getElementById('player');
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.gravity = 1;
        this.maxFrameX = 6;
        this.fps = 45;
        this.frameTimer = 0;
        this.frameInterval = 1000/ this.fps;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        this.currentState = null;
    }
    update(input, deltaTime) {
        this.collision();
        this.currentState.input(input);

        this.x += this.speed * (deltaTime / 16.67);
        if (input.includes('d') && this.currentState !== this.states[6]) this.speed = this.maxSpeed;
        else if (input.includes('a') && this.currentState !== this.states[6]) this.speed = -this.maxSpeed;
        else this.speed = 0; 

        this.y += this.vy * (deltaTime / 16.67);
        if (!this.onGround()) this.vy += this.gravity * (deltaTime / 16.67);
        else this.vy = 0

        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
        
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width -  this.width;

        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrameX) this.frameX ++
            else this.frameX = 0
            this.frameTimer = 0;    
        }
        else {
            this.frameTimer += (deltaTime);
        }

    }
    draw(context, deltaTime) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height -this.game.groundMargin;
    }
    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = (this.game.maxSpeed) * speed; 
        this.currentState.enter();
    }
    collision() {
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y 
            ){
                enemy.delete = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + (enemy.width * 0.5), enemy.y + (enemy.height * 0.5)));
                if (this.currentState === this.states[4] || this.currentState === this.states[5]) {
                    this.game.score ++;
                }
                else {
                    this.setState(6, 0);
                    this.game.lives--;
                    if (this.game.lives <= 0) this.game.gameOver = true;
                }
                
            }
        });
    }
}
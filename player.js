import {Sitting, Running, Jumping, Falling} from "./playerStates.js";

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
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input, deltaTime) {
        this.currentState.input(input);

        this.x += this.speed;
        if (input.includes('d')) this.speed = this.maxSpeed;
        else if (input.includes('a')) this.speed = -this.maxSpeed;
        else this.speed = 0; 

        this.y += this.vy;
        if (!this.onGround()) this.vy += this.gravity;
        else this.vy = 0
        
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width -  this.width;

        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrameX) this.frameX ++
            else this.frameX = 0
            this.frameTimer = 0;    
        }
        else {
            this.frameTimer += deltaTime;
        }

    }
    draw(context, deltaTime) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height -this.game.groundMargin;
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}
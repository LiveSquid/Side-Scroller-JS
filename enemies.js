class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.timeInterval = 1000/ this.fps;
        this.frameTimer = 0; 
        this.delete = false;
    }
    update(deltaTime) {
        this.x -= this.speedX; 
        this.y += this.speedY;

        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrameX) this.frameX ++
            else this.frameX = 0
            this.frameTimer = 0;    
        }
        else {
            this.frameTimer += deltaTime;
        } 

        if (this.x + this.width < 0) this.delete = true;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game
        this.width = 60;
        this.height = 44;
        this.x = this.game.width - this.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 2;
        this.speedY = 0;
        this.maxFrameX = 5;
        this.image = fly;
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}

export class GroundEnemey extends Enemy {

}

export class ClimbingEnemy extends Enemy {

}
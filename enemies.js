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
        this.x -= (this.speedX * (deltaTime / 16.67)) + this.game.speed; 
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
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game
        this.width = 60;
        this.height = 44;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrameX = 5;
        this.image = fly;
        this.angle = 0;
        this.vAngle = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.vAngle * (deltaTime / 16.67);
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemey extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = plant;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrameX = 1;
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = spiderBig;
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : - 1;
        this.maxFrameX = 5;
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
        if (this.y < -this.height) this.delete = true;
        this.y += this.speedY * (deltaTime / 16.67);
    }
    draw(context) {
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width/2, 0);
        context.lineTo(this.x + this.width/2, this.y + 50);
        context.stroke();
    }
}
class Particle {
    constructor(game) {
        this.game = game
        this.delete = false;
    }
    update(deltaTime) {
        this.x -=(this.speedX + this.game.speed) * (deltaTime / 16.67);
        this.y -= this.speedY * (deltaTime / 16.67);
        this.size *= 0.97;
        if (this.size < 0.5) this.delete = true;
    }
}
export class Dust extends Particle {
    constructor(game, x, y)  {
        super(game);
        this.size = Math.random() * 10 + 5;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(0, 0, 0, 0.2';
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI *2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Splash extends Particle {
    constructor(game, x, y)  {
        super(game);
        this.size = Math.random() * 100 + 100; 
        this.x = x - this.size * 0.4;
        this.y = y - this.size * 0.5;
        this.speedX = Math.random() * 6 - 4;
        this.speedY = Math.random() * 2 + 2;
        this.gravity = 0;
        this.image = fire;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.gravity += 0.1;
        this.y += this.gravity;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

export class Fire extends Particle {
    constructor(game, x, y)  {
        super(game);
        this.image = fire;
        this.size = Math.random() * 100 + 50;
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.x += Math.sin(this.angle * 10)
    }
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, 0, 0,  this.size * 0.8, this.size * 0.8);
        context.restore();
    }
}
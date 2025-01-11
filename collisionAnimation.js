export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.image = boom;
        this.spriteHeight = 90;
        this.spriteWidth = 100;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrameX = 4;
        this.fps = 12;
        this.frameTimer = 0;
        this.frameInterval = 1000/ this.fps;
        this.delete = false;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteHeight, this.spriteHeight, this.x, this.y, this.width, this.height);  
    }
    update(deltaTime) {
        this.x -= this.game.speed * (deltaTime / 16.67);

        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrameX) this.frameX ++
            else this.delete = true;
            this.frameTimer = 0;    
        }
        else {
            this.frameTimer += (deltaTime);
        }
    }
}
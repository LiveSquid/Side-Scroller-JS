export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.fontFamily2 = 'Helvetica';
        this.livesImage = heart;
    }
    draw(context) {
        context.save();
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = 'white';
        context.shadowBlur = 0.5;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText('Score: ' + this.game.score, 20, 50);

        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);

        for (let i = 0; i < this.game.lives; i += 1.3) {
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
        }
        
        
        if(this.game.gameOver) {
            console.log('test');
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('Game Over! Your Score Is: ' + this.game.score, this.game.width * 0.5, this.game.height * 0.5);

            context.font = this.fontSize * 0.6 + 'px ' + this.fontFamily2;
            context.fillText('Not to Brag but My Highscore is 182 ', this.game.width * 0.5, this.game.height * 0.5 + 40);
        }
        context.restore();
    }
}
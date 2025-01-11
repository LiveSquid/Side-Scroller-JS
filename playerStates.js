import { Dust, Fire, Splash } from './particles.js';

export const states = {
    sitting: 0,
    running: 1,
    jumping:2,
    falling: 3,
    rolling: 4,
    diving: 5,
    hit: 6,
};

class State  {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {
    constructor(game) {
        super('sitting', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrameX = 4;
    }
    input(input) {
        if (!input.includes('Shift')) this.game.player.setState(states.running, 1);
        if (input.includes('d') || input.includes('a')) this.game.player.setState(states.running, 1);
        else if (input.includes(' ')) this.game.player.setState(states.rolling, 3);
    }
}

export class Running extends State {
    constructor(game) {
        super('running', game);
       
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 3;
        this.game.player.maxFrameX = 8;
    }
    input(input) {
        this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width * 0.6, this.game.player.y + this.game.player.height))
        if (input.includes('Shift')) this.game.player.setState(states.sitting, 0);
        else if (input.includes('w')) this.game.player.setState(states.jumping, 1);
        else if (input.includes(' ')) this.game.player.setState(states.rolling, 3);
    }
}

export class Jumping extends State {
    constructor(game) {
        super('jumping', game);
    }
    enter() {
        this.game.player.frameX = 0;
        if (this.game.player.onGround()) this.game.player.vy -=21;
        this.game.player.frameY = 1;
        this.game.player.maxFrameX = 6;
    }
    input(input) {
        if (this.game.player.vy > 0) this.game.player.setState(states.falling, 1);
        else if (input.includes(' ')) this.game.player.setState(states.rolling, 3);
        else if (input.includes('Shift')) this.game.player.setState(states.diving, 0);
    }
}

export class Falling extends State {
    constructor(game) {
        super('falling', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 2;
        this.game.player.maxFrameX = 6;
    }
    input(input) {
        if (this.game.player.onGround()) this.game.player.setState(states.running, 1);
        else if (input.includes('Shift')) this.game.player.setState(states.diving, 0);
    }
}

export class Rolling extends State {
    constructor(game) {
        super('rolling', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrameX = 6;
    }
    input(input) {
        this.game.particles.push(new Fire(this.game, this.game.player.x - this.game.player.width * 0.28, this.game.player.y - 10))
        if (!input.includes(' ') && this.game.player.onGround()) this.game.player.setState(states.running, 1);
        else if (!input.includes(' ') && !this.game.player.onGround()) this.game.player.setState(states.falling, 1);
        else if (input.includes('w')  && this.game.player.onGround()) this.game.player.vy -= 23;
        else if (!this.game.player.onGround() && input.includes('Shift')) this.game.player.setState(states.diving, 0);
    }
}

export class Diving extends State {
    constructor(game) {
        super('diving', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrameX = 6;
        this.game.player.vy = 15;
    }
    input(input) {
        this.game.particles.push(new Fire(this.game, this.game.player.x - this.game.player.width * 0.28, this.game.player.y - 10))
        if (this.game.player.onGround()) {
            this.game.player.setState(states.running, 1);
            for (let i = 0; i < 30; i++) {
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.6, this.game.player.y + this.game.player.height * 1));
            }
        } 
        else if (input.includes(' ') && this.game.player.onGround()) this.game.player.setState(states.rolling, 3);
    }
}

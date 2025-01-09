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
    constructor(state) {
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player) {
        super('sitting');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.maxFrameX = 4;
    }
    input(input) {
        if (input.includes('d') || input.includes('a')) this.player.setState(states.running, 1);
        if (input.includes('Enter')) this.player.setState(states.rolling, 2);
    }
}

export class Running extends State {
    constructor(player) {
        super('running');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.maxFrameX = 8;
    }
    input(input) {
        if (input.includes('s')) this.player.setState(states.sitting, 0);
        else if (input.includes('w')) this.player.setState(states.jumping, 1);
    }
}

export class Jumping extends State {
    constructor(player) {
        super('jumping');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        if (this.player.onGround()) this.player.vy -=20;
        this.player.frameY = 1;
        this.player.maxFrameX = 6;
    }
    input(input) {
        if (this.player.vy > this.player.gravity) this.player.setState(states.falling, 1);
    }
}

export class Falling extends State {
    constructor(player) {
        super('falling');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrameX = 6;
    }
    input(input) {
        if (this.player.onGround()) this.player.setState(states.running, 1);
    }
}

export class Rolling extends State {
    constructor(player) {
        super('rolling');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 6;
        this.player.maxFrameX = 6;
    }
    input() {
        if (!input.includes('Enter') && this.player.onGround()) this.player.setState(states.running, 1);
        else if (!input.includes('Enter') && !this.player.onGround()) this.player.setState(states.falling, 1);
    }
}
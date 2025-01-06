export const states = {
    sitting: 0,
    running: 1,
    jumping:2,
    falling: 3,
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
        if (input.includes('d') || input.includes('a')) this.player.setState(states.running);

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
        if (input.includes('s')) this.player.setState(states.sitting);
        else if (input.includes('w')) this.player.setState(states.jumping);
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
        if (this.player.vy > this.player.gravity) this.player.setState(states.falling);
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
        if (this.player.onGround()) this.player.setState(states.running);
    }
}
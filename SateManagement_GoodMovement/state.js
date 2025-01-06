export const states = {
    standingLeft: 0,
    standingRight: 1, 
    sittingLeft: 2,
    sittingRight: 3,
    runningLeft: 4,
    runningRight: 5,
    jumpingLeft: 6,
    jumpingRight: 7,
    fallingLeft: 8,
    fallingRight: 9,

};

class State  {
    constructor(state) {
        this.state = state;
    }
}

export class StandingLeft extends State {
    constructor(player) {
        super('standingLeft');
        this.player = player;
    }
    enter() {
        this.player.frameY = 1
        this.player.maxFrameX = 6;
        this.player.speed = 0;
    }
    input(input) {
        if (input === 'PRESS d') this.player.setState(states.standingRight);
        else if (input === 'PRESS a') this.player.setState(states.runningLeft);
        else if (input === 'PRESS s') this.player.setState(states.sittingLeft);
        else if (input === 'PRESS w') this.player.setState(states.jumpingLeft)
    }
}

export class StandingRight extends State {
    constructor(player) {
        super('standingRight');
        this.player = player;
    }
    enter() {
        this.player.frameY = 0;
        this.player.maxFrameX = 6;
        this.player.speed = 0;
    }
    input(input) {
        if (input === 'PRESS a') this.player.setState(states.standingLeft);
        else if (input === 'PRESS d') this.player.setState(states.runningRight);
        else if (input === 'PRESS s') this.player.setState(states.sittingRight);
        else if (input === 'PRESS w') this.player.setState(states.jumpingRight)
    }
}

export class SittingLeft extends State {
    constructor(player) {
        super('sittingLeft');
        this.player = player;
    }
    enter() {
        this.player.frameY = 9;
        this.player.maxFrameX = 4;
        this.player.speed = 0;
    }
    input(input) {
        if (input === 'PRESS d') this.player.setState(states.sittingRight);
        else  if (input === 'RELEASE s') this.player.setState(states.standingLeft);
    }
}

export class SittingRight extends State {
    constructor(player) {
        super('sittingRight');
        this.player = player;
    }
    enter() {
        this.player.frameY = 8;
        this.player.maxFrameX = 4;
        this.player.speed = 0;
    }
    input(input) {
        if (input === 'PRESS a') this.player.setState(states.sittingLeft);
        else if (input === 'RELEASE s') this.player.setState(states.standingRight);
    }
}

export class RunningLeft extends State {
    constructor(player) {
        super('runningLeft');
        this.player = player;
    }
    enter() {
        this.player.frameY = 7;
        this.player.maxFrameX = 8;
        this.player.speed = - this.player.maxSpeed;
    }
    input(input) {
        if (input === 'PRESS d') this.player.setState(states.runningRight);
        else if (input === 'RELEASE a') this.player.setState(states.standingLeft);
        else if (input === 'PRESS s') this.player.setState(states.sittingLeft);
        else if (input === 'PRESS w') this.player.setState(states.jumpingLeft)
    }
}

export class RunningRight extends State {
    constructor(player) {
        super('runningRight');
        this.player = player;
    }
    enter() {
        this.player.frameY = 6;
        this.player.maxFrameX = 8;
        this.player.speed = this.player.maxSpeed;
    }
    input(input) {
        if (input === 'PRESS a') this.player.setState(states.runningLeft);
        else if (input === 'RELEASE d') this.player.setState(states.standingRight);
        else if (input === 'PRESS s') this.player.setState(states.sittingRight);
        else if (input === 'PRESS w') this.player.setState(states.jumpingRight)
    }
}

export class JumpingLeft extends State {
    constructor(player) {
        super('jumpingLeft');
        this.player = player;
    }
    enter() {
        this.player.frameY = 3;
        this.player.maxFrameX = 6;
        if (this.player.onGround()) this.player.vy -= 20;
        this.player.speed = - this.player.maxSpeed * 0.5;
    }
    input(input) {
        if (input === 'PRESS d') this.player.setState(states.jumpingRight);
        else if (this.player.vy >= 0) this.player.setState(states.fallingLeft);
    }
}

export class JumpingRight extends State {
    constructor(player) {
        super('jumpingRight');
        this.player = player;
    }
    enter() {
        this.player.frameY = 2;
        this.player.maxFrameX = 6;
        if (this.player.onGround()) this.player.vy -= 20;
        this.player.speed = this.player.maxSpeed * 0.5;
    }
    input(input) {
        if (input === 'PRESS a') this.player.setState(states.jumpingLeft);
        else if (this.player.vy >= 0) this.player.setState(states.fallingRight);
    }
}

export class FallingLeft extends State {
    constructor(player) {
        super('fallingLeft');
        this.player = player;
    }
    enter() {
        this.player.frameY = 5;
        this.player.maxFrameX = 6;
    }
    input(input) {
        if (this.player.onGround()) this.player.setState(states.standingLeft);
        else if (input === 'PRESS d') this.player.setState(states.fallingRight);
    }
}

export class FallingRight extends State {
    constructor(player) {
        super('fallingRight');
        this.player = player;
    }
    enter() {
        this.player.frameY = 4;
        this.player.maxFrameX = 6;
    }
    input(input) {
        if (this.player.onGround()) this.player.setState(states.standingRight);
        else if (input === 'PRESS a') this.player.setState(states.fallingLeft);
    }
}
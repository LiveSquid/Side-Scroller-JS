export function drawStatusText(context, input, player) {
    context.font = '30px Helvetica';
    context.fillText('Last Input: ' + input.lastKey, 20, 30);
    context.fillText('Current State: ' + player.currentState.state, 20, 90);
};
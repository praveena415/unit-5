const eventEmitter = require('./events');

function simulateSystem() {
    setTimeout(() => {
        eventEmitter.emit('userLoggedIn', 'John');
    }, 1000);

    setTimeout(() => {
        eventEmitter.emit('messageReceived', 'Hello John, welcome back!');
    }, 2000);

    setTimeout(() => {
        console.log('> Syncing user data...');
    }, 3000);

    setTimeout(() => {
        eventEmitter.emit('dataSynced');
    }, 5000);
}

simulateSystem();

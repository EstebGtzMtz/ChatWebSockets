const socket = io();

const namesArray = ['Xayah', 'Garen', 'Varus', 'Rakan', 'Vayne', 'Twitch', 'Shen', 'Katarina'];
const randomIndex = Math.floor(Math.random() * (9 - 0 + 1) + 0);

const user = {
    name: namesArray[randomIndex]
}

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('openChat', user, (res) => {
        console.log('connected Users', res)
    });
});

socket.on('disconnect', () => {
    console.log('Lost server connection');
});


socket.on('createNotification', message => {
    console.log('Servidor:', message);
});

socket.on('usersConnected', users => {
    console.log(users)
});

socket.on('privateMessage', message => {
    console.log('Private message', message);
});
const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils')
const users = new Users();

io.on('connection', (client) => {

    client.on('openChat', (user, callback) => {
        const conectedUsers = users.addUser(client.id, user.name);
        client.broadcast.emit('usersConnected', users.getAllUsers());
        callback(conectedUsers);
    });

    client.on('createNotification', (data) => {
        const originUser = users.getUser(client.id);
        const messageContent = createMessage(originUser.name, data.message);
        client.broadcast.emit('createNotification', messageContent);
    });

    client.on('disconnect', () => {
        const disconnectedUserFromChat = users.removeUserFromChat(client.id);
        client.broadcast.emit('createNotification', createMessage('Admin', `${disconnectedUserFromChat.name} has abandoned the chat`));
        client.broadcast.emit('usersConnected', users.getAllUsers());
    });

    client.on('privateMessage', data => {
        const originUser = users.getUser(client.id);
        const messageContent = createMessage(originUser.name, data.message);
        client.broadcast.to(data.to).emit('privateMessage', messageContent);
    });
});
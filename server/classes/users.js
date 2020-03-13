class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name) {
        const user = { id, name };
        this.users.push(user);
        return this.users;
    }

    getUser(id) {
        const user = this.users.filter(user => user.id === id)[0];
        return user;
    }

    getAllUsers() {
        return this.users;
    }

    removeUserFromChat(id) {
        const removedUser = this.getUser(id);
        this.users = this.users.filter(user => user.id != id);

        return removedUser;
    }
}

module.exports = {
    Users
}
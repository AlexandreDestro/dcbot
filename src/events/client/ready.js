module.exports = {
    name: 'ready',
    ondce: true,
    async execute(client) {
        console.log(`Ready! ${client.user.tag} is in the world`);
    }
}
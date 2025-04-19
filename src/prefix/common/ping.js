module.exports = {
    name: null,
    description: 'returns pong',
    titulo: '!ping',

    run: (client, message, interaction) => {
    
        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;
        message.reply(newMessage);
    }
}


module.exports = {
    name: 'ping',
    description: 'returns pong',

    run: (client, message, interaction) => {
    
        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;
        message.reply(newMessage);
    }
}


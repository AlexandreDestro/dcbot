const fs = require('fs');

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventsFolder = fs.readdirSync(`./src/events`);
        for(const folder of eventsFolder) {
            const eventsFiles = fs
            .readdirSync(`./src/events/${folder}`)
            .filter(file => file.endsWith('.js'));
            
            switch (folder) {
                case "client":
                    for (const file of eventsFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client)); 
                    }
                    break;
            
                default:
                    break;
            }
        }
    }
}
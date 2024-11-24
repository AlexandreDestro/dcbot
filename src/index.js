require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

//music-player req.
const {REST} = require("@discordjs/rest");
const {Routes} = require ("discord-api-types/v9");
//const {Player} = require ("discord-player");

//const { YouTubeExtractor } = require('@discord-player/extractor');
const { useMainPlayer } = require('discord-player');
const player = useMainPlayer();

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
] });
client.commands = new Collection();
client.commandArray = [];
client.prefix = new Map();

////////////////////////////

//colector?
//let channel = client.channels.cache.get("channel Id");
//const collector = new Discord.MessageCollector(channel, { filter: filter, time: 10000, max: 1 });

//discord-youtubei
//    const { YoutubeiExtractor } = require("discord-player-youtubei");
//    const player = new Player();
//    const oauthTokens = getOauthTokens()

//    player.extractors.register(YoutubeiExtractor, {
 //       authentication: oauthTokens
 //   })


// player
//client.player = useMainPlayer(client, {
//    ytdlOptions: {
//        quality: "highestaudio",
//        highWaterMark: 1 << 25
//    }
//});




//extrator

//client.once('ready', () => {
 
//    const player = useMainPlayer();

 //   player.extractors.loadDefault();
    //player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

    //player.extractors.register(YouTubeExtractor);
//    console.log('loadDefault exec');
//});


//prefix folders
    const prefixFolders = fs.readdirSync(`./src/prefix`);
    for (const pfolder of prefixFolders) {
        const prefixFiles = fs
            .readdirSync(`./src/prefix/${pfolder}`)
            .filter((pfile) => pfile.endsWith('.js'));
        for (const pfile of prefixFiles)
            require(`./prefix/${pfolder}/${pfile}`);
        for (arx of prefixFiles) {
            const Cmd = require(`./prefix/${pfolder}/` + arx)
            client.prefix.set(Cmd.name, Cmd, Cmd.titulo, Cmd.uso)
        }
    }

// prefix
client.on('messageCreate', async message => {
    const prefix = "!";

    if (!message.content.startsWith(prefix) || message.author.bot) {return};
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commando = args.shift().toLowerCase();
    const regexNumeros = /[0-9]/g;
    var commandoclear = commando.replace(regexNumeros, '');
    var prefixcmd = client.prefix.get(commandoclear);
    if (prefixcmd) {
        
        prefixcmd.run(client, message, args, commando);
    }
});


//function
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`) (client);
}


client.handleEvents();
client.handleCommands();
client.login(token);

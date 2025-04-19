// commands/play.js
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require("@discordjs/voice");
const { execFileSync } = require("child_process");
const { queues, createPlayer, playNext } = require("../../utils/music_manager");

module.exports = {
    name: "play",
    aliases: ["p"],
    description: "Toca uma música ou adiciona à fila.",
    titulo: '!play',
    async run(client, message, args) {
        if (!args.length) return message.reply("❌ Diga o nome ou link da música!");

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply("❌ Você precisa estar em um canal de voz!");

        const query = args.join(" ");
        const guildId = message.guild.id;
        const isUrl = /^https?:\/\/.+/.test(query);
        const ytdlpInput = isUrl ? query : `ytsearch1:${query}`;

        message.channel.send(`🔍 Procurando...`);

        let title = "Desconhecida", url = query, duration = null, thumbnail = null;
        try {
            const info = execFileSync("yt-dlp", [
                "--no-playlist",
                "--quiet",
                "--force-ipv4",
                "--print", "%(title)s||%(webpage_url)s||%(duration_string)s||%(thumbnail)s",
                ytdlpInput
            ]).toString().trim();

            [title, url, duration, thumbnail] = info.split("||");
        } catch (err) {
            console.warn("Metadados indisponíveis:", err);
        }

        let queueData = queues.get(guildId);

        if (!queueData) {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            try {
                await entersState(connection, VoiceConnectionStatus.Ready, 10_000);
            } catch {
                return message.reply("❌ Erro ao conectar no canal de voz!");
            }

            const player = createPlayer(guildId, connection, message.channel);

            queueData = {
                connection,
                player,
                queue: [],
                nowPlaying: null
            };

            queues.set(guildId, queueData);
        }

        queueData.queue.push({ input: ytdlpInput, title, url, duration, thumbnail });

        if (queueData.player.state.status === "idle" && !queueData.nowPlaying) {
            playNext(guildId, message.channel);
        } else {
            message.channel.send(`✅ [${title}](${url}) foi adicionada à fila.`);
        }
    }
};

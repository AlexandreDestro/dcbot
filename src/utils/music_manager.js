const { createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, VoiceConnectionStatus } = require("@discordjs/voice");
const { spawn, execFileSync } = require("child_process");

const queues = new Map(); // guildId => { connection, player, queue, nowPlaying }

function createPlayer(guildId, connection, textChannel) {
    const player = createAudioPlayer();

    player.on(AudioPlayerStatus.Idle, () => {
        const queueData = queues.get(guildId);
        if (!queueData || queueData.queue.length === 0) {
            connection.destroy();
            queues.delete(guildId);
            return;
        }

        playNext(guildId, textChannel);
    });

    player.on("error", (error) => {
        console.error("Player error:", error);
        textChannel.send("❌ Erro ao reproduzir a música.");
    });

    connection.subscribe(player);

    return player;
}

async function playNext(guildId, textChannel) {
    const queueData = queues.get(guildId);
    const next = queueData.queue.shift();
    if (!next) return;

    const { input, title, url, duration, thumbnail } = next;

    try {
        const ytdlp = spawn("yt-dlp", [
            "-o", "-",
            "-f", "bestaudio[ext=webm]/bestaudio",
            "--no-playlist",
            "--quiet",
            "--force-ipv4",
            "--audio-quality", "0",
            input
        ]);

        const ffmpeg = spawn("ffmpeg", [
            "-i", "pipe:0",
            "-f", "ogg",
            "-c:a", "libopus",
            "-b:a", "128k",
            "-vbr", "on",
            "-ar", "48000",
            "-ac", "2",
            "pipe:1"
        ], { stdio: ["pipe", "pipe", "ignore"] });

        ytdlp.stdout.pipe(ffmpeg.stdin);

        const resource = createAudioResource(ffmpeg.stdout, {
            inputType: "ogg/opus",
            highWaterMark: 1 << 20
        });

        queueData.player.play(resource);
        queueData.nowPlaying = { title, url, duration, thumbnail };
        
        textChannel.send(`🥣 Tocando agora: [${title}](${url}), (${duration})`);
        
    } catch (err) {
        console.error("Erro ao tocar:", err);
        textChannel.send("❌ Erro ao tocar a música.");
    }
}

module.exports = {
    queues,
    createPlayer,
    playNext
};

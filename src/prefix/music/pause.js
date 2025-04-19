// commands/pause.js
const { queues } = require("../../utils/music_manager");

module.exports = {
    name: "pause",
    description: "Pausa a música atual.",
    titulo: '!pause',
    run(client, message) {
        const queue = queues.get(message.guild.id);
        if (!queue || !queue.player) return message.reply("❌ Nenhuma música tocando.");

        queue.player.pause();
        message.reply("⏸️ Música pausada!");
    }
};

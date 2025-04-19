// commands/resume.js
const { queues } = require("../../utils/music_manager");

module.exports = {
    name: "resume",
    description: "Continua a música pausada.",
    titulo: '!resume',
    run(client, message) {
        const queue = queues.get(message.guild.id);
        if (!queue || !queue.player) return message.reply("❌ Nada está pausado.");

        queue.player.unpause();
        message.reply("▶️ Música retomada!");
    }
};

// commands/skip.js
const { queues, playNext } = require("../../utils/music_manager");

module.exports = {
    name: "skip",
    description: "Pula para a próxima música.",
    titulo: '!skip',
    run(client, message) {
        const guildId = message.guild.id;
        const queue = queues.get(guildId);
        if (!queue || !queue.player) return message.reply("❌ Nada pra pular.");

        queue.player.stop(); // Isso chama automaticamente o player.on("Idle")
        message.reply("⏭️ Pulando para a próxima...");
    }
};

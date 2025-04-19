
const { queues } = require("../../utils/music_manager");

module.exports = {
    name: "fila",
    description: "Mostra a fila de reprodução.",
    aliases: ["queue"],

    run(client, message) {
        const queueData = queues.get(message.guild.id);
        if (!queueData) {
            return message.reply("📭 A fila está vazia no momento.");
        }

        const { nowPlaying, queue } = queueData;
        let description = "";

        if (nowPlaying) {
            description += `🎶 **Tocando agora:** [${nowPlaying.title}](${nowPlaying.url})\n`;
        }

        if (queue.length === 0) {
            description += `📭 Nenhuma música na fila.`;
        } else {
            const list = queue
                .slice(0, 10)
                .map((track, index) => `**${index + 1}.** [${track.title}](${track.url})`)
                .join("\n");

            description += `📃 **Próximas músicas:**\n${list}`;

            if (queue.length > 10) {
                description += `\n...e mais **${queue.length - 10}** músicas.`;
            }
        }

        message.channel.send({
            embeds: [
                {
                    title: "📀 Fila de Reprodução",
                    description,
                    color: 0x00BFFF
                }
            ]
        });
    }
};

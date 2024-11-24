const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xandobot')
        .setDescription('Returns Xandobot.'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle(`Xandobot`) 
        .setDescription("Xandobot")
        .setColor(0x18e1ee)
        .setImage(client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: client.user.tag
        })
        
        .addFields([
            {
                name: `Xandobot`,
                value: `Xandobot`,
                inline: true
            },
            {
                name: `Xandobot`,
                value: `Xandobot`,
                inline: true
            }
        ]);

        await interaction.reply({
            embeds: [embed]
        });
        },
        
    }

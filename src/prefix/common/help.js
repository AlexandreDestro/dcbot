
module.exports = {
    name: 'help',
    description: 'Lista todos os comandos disponíveis.',
    titulo: '!help',
    uso: '',

    run: (client, message, args, commando) => {
        if (!client.prefix || client.prefix.size === 0) {
            return message.reply('Nenhum comando foi registrado no momento.');
        }

        // Cria uma lista formatada de comandos
        const ct = "```";
        let commandList = 'Comandos disponíveis:\n';
        client.prefix.forEach((cmd) => {
            if(cmd.titulo){
                let apend1 = ''
                if(cmd.uso){
                    apend1 = `${ct}a\n${cmd.uso}${ct}\n`
                }
            commandList += `- **${cmd.titulo}**: ${cmd.description || 'Sem descrição'}\n${apend1}`;
            }
        });

        // Envia a lista ao canal
        message.channel.send(commandList)
            .catch((error) => {
                console.error('Erro ao enviar a lista de comandos:', error);
            });
    },
};

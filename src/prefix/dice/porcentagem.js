const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '%',
    aliases: ['p'],
    description: 'Rola um dado d20',
    titulo: '!d20',
    uso: '!d30, !3d25, !5d, !d',

    run: (client, message, args, commando) => {
    
        
        var [numberOfRolls, numberOfFaces] = commando.split('d').map(arg => parseInt(arg));
        var rollmulti = args[0]

        let mensagem = ` `;
        // Separa o número de rolagens e o número de lados do dado
        
        if (numberOfRolls <= 0 || isNaN(numberOfRolls)) {
          numberOfRolls = 1;
        }
        if (numberOfFaces <= 0 || isNaN(numberOfFaces)) {
          numberOfFaces = 20;
        }
        if (rollmulti <= 0 || isNaN(rollmulti)) {
          rollmulti = 1;
        }

        if (numberOfRolls >= 1000){
          mensagem = `Erro: ta de brincadeira?🤨`;
          message.reply(mensagem);
        }
        if (numberOfRolls < 1000){
          mensagem = rolarDado();
        }

        // Realiza as rolagens dos dados
        function rolarDado() {
          let sumgroup = [];
          let rollgroup = [];
          for (let ii = 0; ii < rollmulti; ii++) {
            let rolls = [];
            let sum = 0;
            for (let i = 0; i < numberOfRolls; i++) {
                const rollResult = Math.floor(Math.random() * numberOfFaces) + 1;
                rolls.push(rollResult);
                sum += rollResult;
            }
            rollgroup.push(rolls);
            sumgroup.push(sum);
          }
          for (let i = 0; i < rollgroup.length; i++){
            rollgroup[i] = `${rollgroup[i].join(', ')}`
          }
          console.log(rollgroup);


          let r_final = `${rollgroup.join(', ')}`
          let sum = `${sumgroup.join(', ')}`      
          let apend1 = " ";
          if (numberOfRolls > 1) {apend1 = `\nSoma: ${sum}`};
          let autor = message.author.displayName;
          let apend2 = `\n-# ${autor}`;

          
          let cmd_txt = `${numberOfRolls}d${numberOfFaces}`

          let mensagem = `${cmd_txt}: \n# **[ ${r_final} ]** ${apend1} ${apend2}`;
          
          
          if (mensagem.length > 2000){
            mensagem = `${cmd_txt}: \nErro: muitos caracteres ${apend1} ${apend2}`;
          }
          message.channel.send(mensagem);
          return 

      }
        


    }
}
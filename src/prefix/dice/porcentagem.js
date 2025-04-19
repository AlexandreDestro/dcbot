const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '%',
    aliases: ['pr'],
    description: 'Rola um dado em forma de porcentagem retornando verdadeiro ou falso',
    titulo: '!50%',
    uso: '!50%, !30pr, !20pr 5, !pr',

    run: (client, message, args, commando, commandoclear) => {
    
        
        var [porcento] = commando.split(`${commandoclear}`).map(arg => parseInt(arg));
        var rollmulti = args[0]

        let mensagem = ` `;
        // Separa o número de rolagens e o número de lados do dado
        
        if (porcento <= 0 || isNaN(porcento)) {
          porcento = 1;
        }
       
        if (rollmulti <= 0 || isNaN(rollmulti)) {
          rollmulti = 1;
        }

        if (rollmulti >= 1000){
          mensagem = `Erro: ta de brincadeira?🤨`;
          message.reply(mensagem);
        }
        if (rollmulti < 1000){
          mensagem = porcentar();
        }

        // Realiza as rolagens dos dados
        function porcentar() {
          let soma = 0;
          let rollgroup = [];
          for (let ii = 0; ii < rollmulti; ii++) {
            const rollResult = Math.floor(Math.random() * 100) + 1;
             var b = "❌"
            if (rollResult <= porcento) {
              soma ++
              b = ":white_check_mark:"
            }
            rollgroup.push(b);
            
          }
          //console.log(rollgroup);


          let r_final = `${rollgroup.join(', ')}`
          //let sum = `${soma.join(', ')}`      
          let apend1 = " ";
          let cmd_txt;
          if (rollmulti > 1) {apend1 = `\nAcertos: ${soma}`; cmd_txt = `${porcento}% (${rollmulti}x)`}
           else{cmd_txt = `${porcento}%`}
           
          let autor = message.author.displayName;
          let apend2 = `\n-# ${autor}`;

          
          

          let mensagem = `${cmd_txt}: \n# **[ ${r_final} ]** ${apend1} ${apend2}`;
          
          
          if (mensagem.length > 2000){
            mensagem = `${cmd_txt}: \nErro: muitos caracteres ${apend1} ${apend2}`;
          }
          message.channel.send(mensagem);
          return 

      }
        


    }
}
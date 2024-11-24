module.exports = {
    name: 'a',
    description: 'Gera um valor aleatório entre 2 valores',
    titulo: '!1a10',
    uso: '!8a16, !2a10 3, !a',

    run: (client, message, args, commando) => {

let min = 1;
let max = 10;
let multi = 1;

[min, max] = commando.split('a').map(arg => parseInt(arg));
if(args[0]){
  multi = args[0]
}


if (multi === null || multi < 1 || isNaN(multi)) { multi = 1};

  
if (isNaN(min) || isNaN(max) || min === null || max === null) {
  min = 1;
  max = 10;
}

    // Verifica se o primeiro valor é maior que o segundo
if (min > max) {
  [min, max] = [max, min];
}



if (multi >= 1000){
  mensagem = `Erro: ta de brincadeira?🤨`;
  message.reply(mensagem);
}
if (multi < 1000){
  mensagem = valorEntre();
}

function valorEntre(){


let rolls = [];
        let sum = 0;
        for (let i = 0; i < multi; i++) {
          const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
            rolls.push(randomValue);
            sum += randomValue;
        }

let apend1 = " ";
let apend2 = " ";
if (multi > 1) { apend1 = `(${multi}x)`, apend2 = `\nSoma: ${sum}`};
let autor = message.author.displayName;
let apend3 = `\n-# ${autor}`;

let mensagem = `${min} ~ ${max}:  ${apend1} \n# **[ ${rolls.join(', ')} ]**${apend2} ${apend3}`;
        
        if (mensagem.length > 2000){
          mensagem = `${min} ~ ${max}:  ${apend1} \nErro: resposta ultrapaça 2000 caracteres ${apend2} ${apend3}`;
        }
        message.channel.send(mensagem);
        return
      }

    }}
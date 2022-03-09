const Command = require('../../structures/Command')
const wait = require('node:timers/promises').setTimeout;

const { once } = require('events')
const { MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js')

const actionRow = new MessageActionRow()
      .addComponents(
        [
          new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('-')
          .setCustomId('REMOVER'),

          new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('+')
          .setCustomId('primary'),

          new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('ZERAR')
          .setCustomId('ZERAR'),

          new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('+')
          .setCustomId('primaary'),

          new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('ZERAR')
          .setCustomId('ZERAaR'),

        ]
      )



module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'teste',
      description: 'Peça ajuda ao Zé - Equipe Quest'
    })
  }

  
  run = async (interaction) => {
    interaction.reply({ content: 'oi tudo bem?', components: [actionRow], fetchReply: true})
    const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
    collector.on('collect', async i => {
      if (i.customId === 'primary') {
        await i.deferUpdate();
        await wait(4000);
        await i.editReply({ content: 'A button was clicked!', components: [actionRow] });
      }
    });
    
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    // interaction.reply({ 
    //   content: '**E ai, tudo beleza?\n**Ta precisando de ajuda? Relaxa que _o pai ta ON_.   😎\nJá até deixei algumas opções no jeito.\n\nHá algumas informações já disponíveis em alguns canais caso queira dar uma olhada.\n\n・<#947999441586122783> - Para as regras.\n・<#949746036073705532> - Para mais informações do servidor.\n・<#948262325469708319> <#893264672499847212> - Chat Portugues.\n・<#949819518589472819> <#949820376249172019> - Chat English.\n・<#949820907118022676> <#949821073485078529> - Chat español.\n・<#949795834059448330> - Itens a venda.\n・<#949735151473164388> - Reportar bugs SITE/SERVIDOR/DISCORD.\n・<#949741635636441178> - Sugestoes, sua opnião é importante.\n・<#949774347097235486> - Vantagens de ser VIP/Membro, ja aviso que a melhor delas é manter meu emprego #meajuda.\n\n Você já usou o comando **/apresentacao**? cola lá no <#949714310370840656> conhece um pouco do pessoal, aqui não é tinder mais _vai que_😉\n\nSe esses canais não ajudar, separei alguns tópicos.\nDigite pra mim o número do tópico que você precisa de ajuda.\n\n*1 -* Dados do Servidor.\n*2 -* VIP/Membro.\n*3 -* Horário de Manutenção.\n*4 -* Reportar bug\n*5 -* Problema ao conectar no servidor. \n*6 -* Problema ao acessar o site.\n*7 -*Problema ao acessar algum canal do discord.\n*8 -*Denuncia.\n\n Se mesmo assim não encontrar um topico que seja o motivo do seu problema\n Você pode digitar com o que precisa de ajuda?\n\n**SIM** - Eu enviarei a mensagem para alguem que possa ajudar.\n**NÃO** - Tudo bem, eu fico aguardando seu próximo contato.\n\n\n _Caso não responda em 3 minutos, precisará me chamar novamente. Basta usar_ /helpme 😉', ephemeral: true, components: [[actionRow1], [actionRow2]], fetchReply: true
    // })


    // const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });

    // collector.on('collect', i => {
    //   if (i.user.id === interaction.user.id) {
    //     i.reply(`${i.user.id} no numero ${i.customId} button.`);
    //   } else {
    //     i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    //   }
    // });
    
    // collector.on('end', collected => {
    //   console.log(`Collected ${collected.size} interactions.`);
    // });
  }
}

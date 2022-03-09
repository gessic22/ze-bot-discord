const Command = require('../../structures/Command')

const questions = require('../../util/apresentacaoQuestions')

const { once } = require('events')
const { MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'helpme2',
      description: 'Peça ajuda ao Zé - Equipe Quest'
    })
  }

  run = async (interaction) => {
    interaction.reply({ 
      content: '**E ai, tudo beleza?\n**Ta precisando de ajuda? Relaxa que _o pai ta ON_.   😎\nJá até deixei algumas opções no jeito.\n\nHá algumas informações já disponíveis em alguns canais caso queira dar uma olhada.\n\n・<#947999441586122783> - Para as regras.\n・<#949746036073705532> - Para mais informações do servidor.\n・<#948262325469708319> <#893264672499847212> - Chat Portugues.\n・<#949819518589472819> <#949820376249172019> - Chat English.\n・<#949820907118022676> <#949821073485078529> - Chat español.\n・<#949795834059448330> - Itens a venda.\n・<#949735151473164388> - Reportar bugs SITE/SERVIDOR/DISCORD.\n・<#949741635636441178> - Sugestoes, sua opnião é importante.\n・<#949774347097235486> - Vantagens de ser VIP/Membro, ja aviso que a melhor delas é manter meu emprego #meajuda.\n\n Você já usou o comando **/apresentacao**? cola lá no <#949714310370840656> conhece um pouco do pessoal, aqui não é tinder mais _vai que_😉\n\nSe esses canais não ajudar, separei alguns tópicos.\nDigite pra mim o número do tópico que você precisa de ajuda.\n\n*1 -* Dados do Servidor.\n*2 -* VIP/Membro.\n*3 -* Horário de Manutenção.\n*4 -* Reportar bug\n*5 -* Problema ao conectar no servidor. \n*6 -* Problema ao acessar o site.\n*7 -*Problema ao acessar algum canal do discord.\n*8 -*Denuncia.\n\n Se mesmo assim não encontrar um topico que seja o motivo do seu problema\n Você pode digitar com o que precisa de ajuda?\n\n**SIM** - Eu enviarei a mensagem para alguem que possa ajudar.\n**NÃO** - Tudo bem, eu fico aguardando seu próximo contato.\n\n\n _Caso não responda em 3 minutos, precisará me chamar novamente. Basta usar_ /helpme 😉', ephemeral: true
    })
    console.log (interaction)
    console.log (`${interaction.user.id}`)
    const dois = m => m.content.includes('2')

    if (dois) {
      const collectorUm = interaction.channel.createMessageCollector({dois, max: 1, time: (3 * 60000)});
      collectorUm.on('collect', m => {
        console.log(`Recebi a resposta ${m.content}`)
        interaction.channel.send({ content: `Recebi a resposta ${m.content}`, ephemeral: true });
        console.log (interaction.user.id)
        console.log (interaction)
      });
      
      // collector.on('end', collected => {
      //   console.log(`Collected ${collected.size} items`);
      //   interaction.channel.send({ content: `Cansei de esperar FLW`, ephemeral: true });
      
      // });
    
    
      const answers = []
      const channel = interaction.channel

        const msg = await channel.send({ content: interaction.user.toString()})
        console.log(msg)

          const filter = (i) => i.user.id === interaction.user.id
          const collector = msg.createMessageComponentCollector({ filter, max: 1, time: (3 * 60000) })

          const [collected, reason] = await once(collector, 'end')

          if (reason === 'limit') {
            msg.delete().catch(() => {})
            answers.push({
              name: collected.first().customId,
              value: collected.first().values.join(', ')
            })
          }
          else if (reason === 'time') throw ('Tempo esgotado, formulario cancelado!')
          else throw ('Erro ao executar o formulario! formulario cancelado.')

          } else {
            const msg = await channel.send({ content: interaction.user.toString()})

            const filter = (m) => m.author.id === interaction.user.id && m.content?.length > 0 && m.content?.length < 1058
            const collector = channel.createMessageCollector({ filter, max: 1, time: (2 * 60000) })

            const [collected, reason] = await once(collector, 'end')

            if (reason === 'limit') {
              channel.bulkDelete([msg.id, collected.first().id]).catch(() => {})
              answers.push({
                name: question.name,
                value: collected.first().content
              })
            }
            else if (reason === 'time') throw ('Tempo esgotado, formulario cancelado!')
            else throw ('Erro ao executar o formulario! formulario cancelado.')
          }
      }
    
  } 


const Command = require('../../structures/Command')

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'limpar',
      description: 'Limpa até 99 mensages do canal',
      options: [
        {
          name: 'quantidade',
          type: 'NUMBER',
          description: 'Selecione a quantidade de 1 a 99 mensagens a serem deletadas',
          required: true
        }
      ]
    })
  }

  run = async (interaction, message, args) => {
    if(!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply({ content: 'Você não tem permissão para usar esse comando!', ephemeral: true })
    }
    
    let numero = interaction.options.getNumber('quantidade')

    if(parseInt(numero) > 99 || parseInt (numero) <= 0) {
      return interaction.reply({ content: 'Valor invalido! Digite a quatidade entre \`1 a 99\` de mensagens a ser deletada\nExecute o comando /limpar novamente.', ephemeral: true })
    } else {

      interaction.channel.bulkDelete(parseInt(numero))

      const embed = new MessageEmbed()
                  .setTitle('Mensagens apagadas!')
                  .setDescription(`${numero} mensagens apagadas!`)
                  .setColor('RANDOM')

      interaction.reply({ embeds: [embed]}).then(() => {
        setTimeout(() => {
          interaction.deleteReply()
        }, 1000)
      })
    }}
}
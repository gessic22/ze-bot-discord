const Command = require('../../structures/Command')

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'importante',
      description: 'Faz com que o bot envie uma mensagem importante!',
      options: [
        {
          name: 'mensagem',
          type: 'STRING',
          description: 'Escreva a mensagem que será enviada no canal.',
          required: true
        }
      ]
    })
  }

  run = async (interaction) => {
    if(!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply({ content: 'Você não tem permissão para usar esse comando!', ephemeral: true })}

    const channels = interaction.guild.channels.cache
      .filter(c => c.type === 'GUILD_TEXT' && c.permissionsFor(this.client.user.id).has(['SEND_MESSAGES', 'EMBED_LINKS']) && c.permissionsFor(interaction.user.id).has('SEND_MESSAGES'))

    if(!channels.size) { 
      return interaction.reply({ content: 'Não há canais do servidor que eu possa enviar sua mensagem.', ephemeral: true })}

    const actionRow = new MessageActionRow()
      .addComponents([
        new MessageSelectMenu()
          .setCustomId('channelSelect')
          .setPlaceholder('Selecione um canal de envio da mensagem')
          .addOptions(
            channels
              .map(c => {
                return {
                  label: c.name,
                  value: c.id
                }
              })
          )
      ])

    const reply = await interaction.reply({
            content: `**Mensagem Importante!**\n${interaction.options.getString('mensagem')}`,
            components: [actionRow],
            fetchReply: true
    })

    const filter = (i) => i.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, max: 1, time: (3 * 60000) })

        collector.on('collect', (i) => {
            const idCanal = i.values[0]
            const canal = interaction.guild.channels.cache.get(idCanal)

            const texto = interaction.options.getString('mensagem')

            const embed = new MessageEmbed()
                .setTitle(`Mensagem importante!`)
                .setDescription(texto)
                .setColor('#A52A2A')
                .setTimestamp()

            canal.send({ embeds: [embed] })
                .then(() => interaction.editReply({
                  content: `Mensagem enviada com sucesso no canal ${canal.toString()}.`,
                  components: []
                }))
                .catch(() => interaction.editReply({
                  content: `ERRO | Erro ao tentar enviar a mensagem no canal.`, 
                  components: []
                }))
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time') interaction.editReply({ content: 'O tempo para informar o canal se esgotou!', components: [] })
        })
    }
}
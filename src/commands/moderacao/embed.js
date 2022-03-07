const Command = require('../../structures/Command')

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'embed',
      description: 'faz com que envie uma embed',
      options: [
        {
          name: 'titulo',
          type: 'STRING',
          description: 'Escreva titulo da sua mensagem.',
          required: true
        },
        {
          name: 'mensagem',
          type: 'STRING',
          description: 'Escreva a mensagem que será enviada no canal.',
          required: true
        },
        {
          name: 'footer',
          type: 'STRING',
          description: 'Escreva a mensagem que ficará no rodapé.',
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
            content: ('Escolha o canal de envio da sua mensagem.'),
            components: [actionRow],
            fetchReply: true
    })

    const filter = (i) => i.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, max: 1, time: (3 * 60000) })

        collector.on('collect', (i) => {
            const idCanal = i.values[0]
            const canal = interaction.guild.channels.cache.get(idCanal)

            const texto = interaction.options.getString('mensagem')
            const titulo = interaction.options.getString('titulo')
            const footer = interaction.options.getString('footer')

            const embed = new MessageEmbed()
                .setTitle(titulo)
                .setDescription(texto)
                .setThumbnail("https://storage.googleapis.com/img-muquest/imgs/discord/iconlogo-vermelho.png")
                .setColor('#A52A2A')
                .setFooter({text: `${footer}`, iconURL: "https://storage.googleapis.com/img-muquest/imgs/discord/iconlogo-vermelho.png"})

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
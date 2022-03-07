const Command = require('../../structures/Command')

const questions = require('../../util/apresentacaoQuestions')

const { once } = require('events')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'apresentacao',
      description: 'Nos deixe conhecer um pouco sobre você'
    })
  }

  run = (interaction) => {
    interaction.reply({ content: 'Formulario iniciado. Responda às perguntas abaixo:', ephemeral: true })

    createForm()
      .then(answers => {

        const embed = new MessageEmbed()
            .setTitle('Se apresentou!')
            .setDescription('Estamos felizes em conhecer você!')
            .setAuthor({ name: interaction.user.tag })
            .setTimestamp()
            .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
            .setFooter({text: `ID usuário: ${interaction.user.id}`})
            .setColor('BLUE')
            .addFields(answers)

        interaction.channel.send({ embeds: [embed] })
      }).then(() =>{
        interaction.member.roles.add('950218223113089065')
        interaction.member.roles.remove('950486624440037416') })

      .catch(() => {})

  async function createForm() {
      const answers = []
      const channel = interaction.channel

      for (const question of questions) {
        const embed = new MessageEmbed()
          .setTitle(question.question)
          .setFooter({ text: `Se você não responder em 5 minutos o formulário será cancelado.` })

        if (question.options) {
        const actionRow = new MessageActionRow()
            .addComponents(new MessageSelectMenu(question))

        const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed], components: [actionRow] })

        const filter = (i) => i.user.id === interaction.user.id
        const collector = msg.createMessageComponentCollector({ filter, max: 1, time: (5 * 60000) })

        const [collected, reason] = await once(collector, 'end')

        if (reason === 'limit') {
          msg.delete().catch(() => {})
          answers.push({
            name: collected.first().customId,
            value: collected.first().values.join(', ')
          })
        } else {
          msg.delete().catch(() => {})
          throw ("Erro")
          }

        } else {

          const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed] })

          const filter = (m) => m.author.id === interaction.user.id && m.content?.length > 0 && m.content?.length < 1058
          const collector = channel.createMessageCollector({ filter, max: 1, time: (5 * 60000) })

          const [collected, reason] = await once(collector, 'end')

          if (reason === 'limit') {
            channel.bulkDelete([msg.id, collected.first().id]).catch(() => {})
            answers.push({
              name: question.name,
              value: collected.first().content
            })
          } else {
            msg.delete().catch(() => {})
            throw ("Erro")
          }
        }
      }

      return answers

    }
    
  }
}

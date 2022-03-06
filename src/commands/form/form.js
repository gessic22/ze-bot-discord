const Command = require('../../structures/Command')

const questions = require('../../util/formQuestions')

const { once } = require('events')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'form',
      description: 'Responder ao formulario.'
    })
  }

  run = (interaction) => {
    interaction.reply({ content: 'Formulario iniciado. Responda às perguntas abaixo:', ephemeral: true })

    createForm()
      .then(answers => {

        console.log(interaction)
        const embed = new MessageEmbed()
            .setTitle('Respostas do formulário:')
            .setAuthor({ name: interaction.user.tag, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png` })
            .setTimestamp()
            .setFooter({text: `ID usuário: ${interaction.user.id}`})
            .setColor('BLUE')
            .addFields(answers)

        interaction.channel.send({ embeds: [embed] })
      })
      .catch((erro) => {
        const embed = new MessageEmbed()
          .setColor('RED')
          .setDescription(erro)

        interaction.channel.send({ content: interaction.user.toString(), embeds: [embed] })
      })
  async function createForm() {
      const answers = []
      const channel = interaction.channel

      for (const question of questions) {
        const embed = new MessageEmbed()
          .setTitle(question.question)
          .setFooter({ text: 'Você tem 2 minutos para responder esta pergunta.' })

        if (question.options) {
        const actionRow = new MessageActionRow()
            .addComponents(new MessageSelectMenu(question))

        const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed], components: [actionRow] })

        const filter = (i) => i.user.id = interaction.user.id
        const collector = msg.createMessageComponentCollector({ filter, max: 1, time: (2 * 60000) })

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
          const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed] })

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

      return answers

    }
    
  }
}

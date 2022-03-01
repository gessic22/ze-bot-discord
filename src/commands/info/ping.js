const Command = require('../../structures/Command')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'Mostra o ping do bot.'
    })
  }

  run = (Interaction) => {
    Interaction.reply({
      content: `Estou com o ping de \`${this.client.ws.ping}\` milissegundos`,
      ephemeral: true
    })
  }
}

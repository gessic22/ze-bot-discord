const Event = require ('../../structures/Event')

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: 'ready'
    })
  }

  run = async () => {
    console.log(this.client)

    this.client.user.setPresence({
      status: 'online',

      activities: [{name: 'MU Quest', type: "PLAYING"}]
    })
    
    console.log(`Bot ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores.`)
    this.client.registryCommands()
    await this.client.connectToDatabase()
  }
}



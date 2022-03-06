const { Client } = require('discord.js')

const { readdirSync } = require('fs')
const { join } = require('path')

const mongoose = require('mongoose')
const Models = require('../database/models/Models')

module.exports = class extends Client {
  constructor(options) {
    super(options)

    this.commands = []
    this.loadComands()
    this.loadEvents()
  }

  registryCommands() {
    //temporaria
    this.guilds.cache.get('893264672499847209').commands.set(this.commands)
    //this.application.commands.set(this.commands)

  }

  loadComands(path = 'src/commands'){
    const categories = readdirSync(path)

    for (const category of categories) {
      const commands = readdirSync(`${path}/${category}`)

      for (const command of commands) {
        const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
        const cmd = new (commandClass)(this)

        this.commands.push(cmd)
        console.log(`Comando ${cmd.name} carregado!`)
      }
    }
  }
  loadEvents(path = 'src/events'){
    const categories = readdirSync(path)

    for (const category of categories) {
      const events = readdirSync(`${path}/${category}`)

      for (const event of events) {
        const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
        const evt = new (eventClass)(this)

        this.on(evt.name, evt.run)
        console.log(`Comando ${evt.name} carregado!`)
      }
    }
  }

  async connectToDatabase() {
    const connection = await mongoose.connect(process.env.MONGO_URL)

    console.log('Database Conectada com sucesso!')

    this.db = { connection, ...Models }
  }
}
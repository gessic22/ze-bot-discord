require('dotenv').config()

const Client = require('./src/structures/Client')

const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGES',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_MEMBERS',
    'GUILD_PRESENCES'
  ]
})

client.on('ready', function (){
  console.log('Bot Logado!')
})

client.on('messageCreate', function (message){
  if (message.content === "Geovanio"){
    message.reply("Chama ele não ele é muito chato!")
  }
})

client.login(process.env.BOT_TOKEN)
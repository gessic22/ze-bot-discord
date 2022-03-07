const Event = require ('../../structures/Event')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: 'guildMemberAdd'
    })
  }

  run = async (member) => {
    const guildDB = await this.client.db.guilds.findById(member.guild.id)

    if (guildDB?.welcome) {
      const welcomeChannel = member.guild.channels.cache.get(guildDB.welcome.channel)
      
      const embed = new MessageEmbed()
      .setColor(0x283593)
      .setThumbnail("https://storage.googleapis.com/img-muquest/imgs/discord/iconlogo.png")
      .setTitle("Bem vindo a nossa comunidade Quest!")
      .setDescription(`É muito bom que esteja aqui ${member.toString()}.\nEsse canal foi criado para que mais pessoas possam interagir e se divertir juntas, jogando um clássico dos jogos online MU, em uma plataforma solida livre de ADMs Abusers.\nTrabalhamos para que nossos jogadores possam ter a melhor experiência possível dentro de nossas plataformas, como jogadores nós da <@&947560005979238411> sabemos o quanto é importante uma plataforma funcional e bem estruturada. E que não é somente o jogo que faz algo ser divertido, as pessoas que jogam também são importantes, acarretando amizades para a vida toda.\n\n Caso não conheça acesse nosso site [muonline.quest](https://www.muonline.quest/)`)
      .addFields(
        { name: "Apresente-se", value: "Nada melhor do que conhecer pessoas novas <#949714310370840656>", inline: true },
        { name: "Fique por dentro", value: "Acesse nosso canal de <#949744334545235978> e conheça as novidades.", inline: true }
      )
      .setImage("https://storage.googleapis.com/img-muquest/imgs/discord/pesonagens%20mu.gif")
      .setFooter({text: "Não somos um servidor comum, somos a comunidade Quest.", iconURL: "https://storage.googleapis.com/img-muquest/imgs/discord/iconlogo.png"})

      welcomeChannel?.send({ embeds: [embed] })

    }
  }
}
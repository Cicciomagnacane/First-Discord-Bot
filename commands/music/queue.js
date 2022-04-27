const distube = require("../../lib/music")
const Discord = require('discord.js');

module.exports = {
    name: "queue",
    description: "Show the queue of the songs",
    execute(object, args) 
    {
        const voiceChannel = object.member.voice.channel
        if (!voiceChannel) {
            return object.channel.send("You must be in a voice channel!")
        }

        const voiceChannelBot = object.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return object.channel.send("Someone else is already listening to music!")
        }

        let queue = distube.getQueue(object)

        if (!queue) return object.channel.send("Empty queue")

        let totPage = Math.ceil(queue.songs.length / 10)
        let page = 1

        let songsList = ""
        for (let i = 10 * (page - 1); i < 10 * page; i++) {
            if (queue.songs[i]) {
                songsList += `${i + 1}. **${queue.songs[i].name.length <= 100 ? queue.songs[i].name : `${queue.songs[i].name.slice(0, 100)}...`}** - ${queue.songs[i].formattedDuration}\r`
            }
        }

        let embed = new Discord.MessageEmbed()
            .addField("Queue", songsList)
            .setFooter({ text: `Page ${page}/${totPage}` })

        let button1 = new Discord.MessageButton()
            .setLabel("Previous")
            .setStyle("DANGER")
            .setCustomId("previous")

        let button2 = new Discord.MessageButton()
            .setLabel("Next")
            .setStyle("DANGER")
            .setCustomId("next")

        if (page == 1) button1.setDisabled()
        if (page == totPage) button2.setDisabled()

        let row = new Discord.MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)

            object.channel.send({ embeds: [embed], components: [row] })
            .then(msg => {
                const collector = msg.createMessageComponentCollector()

                collector.on("collect", i => {
                    i.deferUpdate()

                    if (i.user.id != object.author.id) return i.reply({ content: "This button is not yours", ephemeral: true })

                    if (i.customId == "previous") {
                        page--
                        if (page < 1) page = 1
                    }
                    if (i.customId == "next") {
                        page++
                        if (page > totPage) page = totPage
                    }

                    let songsList = ""
                    for (let i = 10 * (page - 1); i < 10 * page; i++) {
                        if (queue.songs[i]) {
                            songsList += `${i + 1}. **${queue.songs[i].name.length <= 100 ? queue.songs[i].name : `${queue.songs[i].name.slice(0, 100)}...`}** - ${queue.songs[i].formattedDuration}\r`
                        }
                    }

                    let embed = new Discord.MessageEmbed()
                        .addField("Queue", songsList)
                        .setFooter({ text: `Page ${page}/${totPage}` })

                    let button1 = new Discord.MessageButton()
                        .setLabel("Previous")
                        .setStyle("DANGER")
                        .setCustomId("previous")

                    let button2 = new Discord.MessageButton()
                        .setLabel("Next")
                        .setStyle("DANGER")
                        .setCustomId("next")

                    if (page == 1) button1.setDisabled()
                    if (page == totPage) button2.setDisabled()

                    let row = new Discord.MessageActionRow()
                        .addComponents(button1)
                        .addComponents(button2)

                    msg.edit({ embeds: [embed], components: [row] })
                })
            })
    }
}
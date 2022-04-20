const Discord = require("discord.js")
const client =new Discord.Client(
    {intents:["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_VOICE_STATES"]}
)

client.login("process.env.token")//

client.on("ready", () => {
    console.log("BOT ONLINE")
})

client.on("messageCreate", (message) => {

    if(message.content=="!Twitch" || message.content=="!twitch")
    {
        message.channel.send("Seguitemi su Twitch: https://www.twitch.tv/magnacane")
    }

    if(message.content=="!serverinfo")
    {
        var server = message.guild;

        var botCount=server.members.cache.filter(member=>member.user.bot).size;
        var userCount=server.members.cache.filter(member => !member.user.bot).size;

        var categoryCount=server.channels.cache.filter(c => c.type == "GUILD_CATEGORY").size
        var textCount=server.channels.cache.filter(c => c.type == "GUILD_TEXT").size
        var voiceCount=server.channels.cache.filter(c => c.type == "GUILD_VOICE").size

        //var owner=client.users.cache.find(user => user.id === server.ownerId) //with this method i catch the username with: owner.username
        var owner=server.members.cache.find(user => user.id === server.ownerId)

        var serverLevel=server.premiumTier;
        if(serverLevel="NONE")
        {
            serverLevel="0"
        }
        
        var embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle(server.name)
            .setDescription("All the info about this server")
            .setThumbnail(server.iconURL())
            .addField("Owner","```" + owner.user.username + "```",true)
            .addField("Server id", "```" +  server.id + "```", true)
            .addField("Server region", "```" +  server.preferredLocale + "```", true)
            .addField("Members", "```" + "Total: " + server.memberCount + " - Users: " + userCount + " - Bots: " + botCount + "```", false)
            .addField("Chennels", "```" + "Category: " + categoryCount + " - Text: " + textCount + " - Voice: " + voiceCount + "```", false)
            .addField("Server created", "```" +  server.createdAt.toDateString() + "```", true)
            .addField("Boost level", "```" +  "Level " + serverLevel + " (Boost: " + server.premiumSubscriptionCount + ")" + "```", true);

        message.channel.send({embeds:[embed]})
    }

    if(message.content.startsWith("!userinfo")) //!userinfo @user NOT WORK!
    {
        if(message.content=="!userinfo")
        {
            var utente=message.member
        }
        else
        {
            var utente=message.mentions.members.first
        }
        if(!utente)
        {
            message.channel.send("User not found!")
            return
        }

        var embed =new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("All the info about this user")
            .setThumbnail(utente.user.avatarURL({dynamic:true}))
            .addField("User id", utente.user.id, true)
            .addField("Status", utente.presence.status, true)
            .addField("Is a bot?", utente.user.bot ? "Yes" : "NO", true)
            .addField("Account created", utente.user.createdAt.toDateString(), true)
            .addField("Joined the server", utente.joinedAt.toDateString(), true)
            .addField("Roles", utente.roles.cache.map(role=>role.name).join("\r"), false)

        message.channel.send({embeds:[embed]})
    }
})

client.on("guildMemberAdd", member => {

    var canale= client.channels.cache.get("941281278257401936")
    canale.setName("Members: " + member.guild.memberCount)

})
client.on("guildMemberRemove", member => {

    var canale= client.channels.cache.get("941281278257401936")
    canale.setName("Members: " + member.guild.memberCount)

})


const { DisTube, Queue } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")

const distube = new DisTube(client, {
    youtubeDL:false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
    leaveOnEmpty: true,
    leaveOnStop: true
})

client.on("messageCreate", (message) => {

    if(message.content.startsWith("!play") || message.content.startsWith("!p"))
    {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel)
        {
            return message.channel.send("You must be in a voice channel!")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if(voiceChannelBot && voiceChannel.id != voiceChannelBot.id)
        {
            return message.channel.send("Someone else is already listening to music!")
        }
        
        let args = message.content.split(/\s+/)
        let query = args.slice(1).join(" ")

        if(!query)
        {
            return message.channel.send("Enter the song you want to hear")
        }

        distube.play(voiceChannelBot || voiceChannel, query, {
            member: message.member,
            textChannel: message.channel,
            message: message
        })
    }

    if(message.content == "!pause")
    {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel)
        {
            return message.channel.send("You must be in a voice channel!")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if(voiceChannelBot && voiceChannel.id != voiceChannelBot.id)
        {
            return message.channel.send("Someone else is already listening to music!")
        }

        try {
            distube.pause(message)
        } catch {
            return message.channel.send("No songs playing or songs already paused")
        }

        message.channel.send("Song paused")
    }

    if (message.content == "!resume") 
    {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("You must be in a voice channel!")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Someone else is already listening to music!")
        }

        try {
            distube.resume(message)
        } catch {
            return message.channel.send("No song playing or song already playing")
        }

        message.channel.send("Song resumed")
    }

    if (message.content == "!queue") {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("You must be in a voice channel!")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Someone else is already listening to music!")
        }

        let queue = distube.getQueue(message)

        if (!queue) return message.channel.send("Empty queue")

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

        message.channel.send({ embeds: [embed], components: [row] })
            .then(msg => {
                const collector = msg.createMessageComponentCollector()

                collector.on("collect", i => {
                    i.deferUpdate()

                    if (i.user.id != message.author.id) return i.reply({ content: "This button is not yours", ephemeral: true })

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

    if (message.content == "!skip") {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("You must be in a voice channel!")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Someone else is already listening to music!")
        }

        try {
            distube.skip(message)
                .catch(() => { return message.channel.send("No song playing or next song not present") })
        } catch {
            return message.channel.send("No song playing or next song not present")
        }

        message.channel.send("Song skipped")
    }

    if (message.content == "!previous") {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("You must be in a voice channel!")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Someone else is already listening to music!")
        }

        try {
            distube.previous(message)
                .catch(() => { return message.channel.send("No song playing or previous song not present") })
        } catch {
            return message.channel.send("NNo song playing or previous song not present")
        }

        message.channel.send("Previous song")
    }

    if (message.content == "!stop") {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("You must be in a voice channel!")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Someone else is already listening to music!")
        }

        try {
            distube.stop(message)
                .catch(() => { return message.channel.send("No songs playing") })
        } catch {
            return message.channel.send("No songs playing")
        }

        message.channel.send("Queue stopped")
    }
})

// distube.on("addSong", (queue, song) => {
//     let embed = new Discord.MessageEmbed()
//         .setTitle(song.name)
//         .setThumbnail(song.thumbnail)
//         .addField("URL:", song.url)
//         .addField("Duration:", "``" + song.duration.toString() + "``" , true)
//         .addField("Added by:", song.user.toString(),true)

//     queue.textChannel.send({ embeds: [embed] })
// })

distube.on("playSong", (queue, song) => {
    let embed = new Discord.MessageEmbed()
        .setTitle(song.name)
        .setThumbnail(song.thumbnail)
        .addField("URL:", song.url)
        .addField("Duration:", "``" + song.duration.toString() + "``" , true)
        .addField("Added by:", song.user.toString(),true)

    queue.textChannel.send({ embeds: [embed] })
})

distube.on("searchNoResult", (message, query) => {
    message.channel.send("Song not found")
})
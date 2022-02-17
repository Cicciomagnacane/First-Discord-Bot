const Discord = require("discord.js")
const client =new Discord.Client(
    {intents:["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES"]}
)

client.login(process.env.token)

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
const Discord = require("Discord.js")
const client =new Discord.Client(
    {intents:["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]}
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

    if(message.content=="!embed")
    {
        var embed = new Discord.MessageEmbed()
            .setTitle("Embed title")
            .setDescription(`${message.author.username}`) 
            .setThumbnail("https://play-lh.googleusercontent.com/xQ-meXSBylIU8VKA7yUQXDwRu99JX8ic7mAsM4sBidjRgtMyhBDmYD4CpATqrdc1SA")

            message.channel.send({ embeds: [embed] })
    }
})
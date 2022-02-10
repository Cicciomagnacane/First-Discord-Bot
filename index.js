const Discord = require("discord.js")
const client =new Discord.Client(
    {intents:["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]}
)

client.login(process.env.token)

client.on("ready", () => {
    console.log("BOT ONLINE")
})

var embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Twitch")
            .setURL("https://www.twitch.tv/magnacane")
            .setAuthor("Magnacane", "https://static-cdn.jtvnw.net/jtv_user_pictures/5c7c8f4e-cc90-4752-a452-08cce7144b01-profile_image-70x70.png", "https://www.twitch.tv/magnacane")
            .setDescription("Seguimi su Twitch!") 
            .setThumbnail("https://static-cdn.jtvnw.net/jtv_user_pictures/5c7c8f4e-cc90-4752-a452-08cce7144b01-profile_image-70x70.png")
            .setImage("https://static-cdn.jtvnw.net/jtv_user_pictures/5c7c8f4e-cc90-4752-a452-08cce7144b01-profile_image-70x70.png")
            .setTimestamp();

            

client.on("messageCreate", (message) => {
    if(message.content=="!Twitch" || message.content=="!twitch")
    {
        message.channel.send("Seguitemi su Twitch: https://www.twitch.tv/magnacane")
    }

    if(message.content=="!embed")
    {
        message.channel.send(embed);
    }
})
const Discord = require("discord.js")

module.exports = {
    name: "help",
    description: "Show all commands",
    execute(object, args) 
    {
        var embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("All Commands")
            .addField("!twitch","Send my Twitch account")
            .addField("!serverinfo","Show the server info")
            .addField("!userinfo","Show your user info")
            .addField("!userinfo @username","Show the info of the tagged user")
            .addField("!sun","Praise The Sun")
            .addField("Music commands:\n!play/!p","Plays the song and adds it to the queue")
            .addField("!pause","Pause the song")
            .addField("!resume","Resume the song")
            .addField("!stop","Stop the music")
            .addField("!skip","Skip to the next song")
            .addField("!previous","Return to the previous song")
            .addField("!stop","Stop the music")
            .addField("!queue","Show the queue")
            
        object.channel.send({embeds:[embed]})
    }
}
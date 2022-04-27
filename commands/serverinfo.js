const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "Show the server info",
    execute(object, args) 
    {
        var server = object.guild;

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

        object.channel.send({embeds:[embed]})
    }
}
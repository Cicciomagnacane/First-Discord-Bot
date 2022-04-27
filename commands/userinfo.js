const Discord = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "Show the user info",
    execute(object, args) 
    {  
        if(object.content=="!userinfo")
        {
            var utente=object.member
        }
        else
        {
            var utente=object.mentions.members.first()
        }
        if(!utente)
        {
            object.channel.send("User not found!")
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

            object.channel.send({embeds:[embed]})
    }
}
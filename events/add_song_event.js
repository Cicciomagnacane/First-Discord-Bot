const distube = require("../lib/music")
const Discord = require('discord.js');
module.exports = {
    name: "addSong",
    type: "music",
    execute(queue, song) 
    {
        let embed = new Discord.MessageEmbed()
            .setTitle(song.name)
            .setThumbnail(song.thumbnail)
            .addField("URL:", song.url)
            .addField("Duration:", "``" + song.formattedDuration + "``" , true)
            .addField("Added by:", song.user.toString(),true)

        queue.textChannel.send({ embeds: [embed] })
    }
}
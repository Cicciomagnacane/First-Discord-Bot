const Discord = require('discord.js');
const distube = require("../lib/music")
module.exports = {
    name: "sun",
    description: "Praise The Sun",
    execute(object, args) 
    {
        var embed = new Discord.MessageEmbed()
            .setColor("#DFFF00")
            .setTitle("PRAISE THE SUN!")
            .setImage("https://c.tenor.com/lIdyY04Okt8AAAAC/dark-souls.gif")
        object.channel.send({embeds:[embed]})
    }

}
const distube = require("../lib/music")
const Discord = require('discord.js');
module.exports = {
    name: "searchNoResult",
    type: "music",
    execute(message, query) 
    {
        message.channel.send("Song not found")
    }
}
const Discord = require("discord.js")

const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")

const distube = new DisTube(client, {
    youtubeDL:false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
    leaveOnEmpty: true,
    leaveOnStop: true
})

module.exports=distube
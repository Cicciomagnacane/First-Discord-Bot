const distube = require("../../lib/music")

module.exports = {
    name: "previous",
    description: "Go to the previous song",
    execute(object, args) 
    {
        const voiceChannel = object.member.voice.channel
        if (!voiceChannel) {
            return object.channel.send("You must be in a voice channel!")
        }

        const voiceChannelBot = object.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return object.channel.send("Someone else is already listening to music!")
        }

        try {
            distube.previous(object)
                .catch(() => { return object.channel.send("No song playing or previous song not present") })
        } catch {
            return object.channel.send("No song playing or previous song not present")
        }

        object.channel.send("Previous song")
    }
}
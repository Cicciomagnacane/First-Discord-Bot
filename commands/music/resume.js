const distube = require("../../lib/music")

module.exports = {
    name: "resume",
    description: "Resume the song",
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
            distube.resume(object)
        } catch {
            return object.channel.send("No song playing or song already playing")
        }

        object.channel.send("Song resumed")
    }
}
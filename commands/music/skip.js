const distube = require("../../lib/music")

module.exports = {
    name: "skip",
    description: "Skip the song",
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
            distube.skip(object)
                .catch(() => { return object.channel.send("No song playing or next song not present") })
        } catch {
            return object.channel.send("No song playing or next song not present")
        }

        object.channel.send("Song skipped")
    }
}
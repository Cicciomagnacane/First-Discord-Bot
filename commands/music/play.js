const distube = require("../../lib/music")

module.exports = {
    name: "play",
    aliases: ["p"],
    description: "Play the music",
    execute(object) 
    {
        const voiceChannel = object.member.voice.channel
        if(!voiceChannel)
        {
            return object.channel.send("You must be in a voice channel!")
        }

        const voiceChannelBot = object.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if(voiceChannelBot && voiceChannel.id != voiceChannelBot.id)
        {
            return object.channel.send("Someone else is already listening to music!")
        }
        
        let args = object.content.split(/\s+/)
        let query = args.slice(1).join(" ")

        if(!query)
        {
            return object.channel.send("Enter the song you want to hear")
        }

        distube.play(voiceChannelBot || voiceChannel, query, {
            member: object.member,
            textChannel: object.channel,
            message: object
        })
    }
}
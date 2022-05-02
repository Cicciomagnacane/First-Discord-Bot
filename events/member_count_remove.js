module.exports = {
    name: "guildMemberRemove",
    type: "discord",
    execute(member) 
    {
        var canale= client.channels.cache.get("969308875134214175")
        canale.setName("Members: " + member.guild.memberCount)
    }
}
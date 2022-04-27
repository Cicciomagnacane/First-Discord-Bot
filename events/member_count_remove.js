module.exports = {
    name: "guildMemberRemove",
    type: "discord",
    execute(member) 
    {
        var canale= client.channels.cache.get("941281278257401936")
        canale.setName("Members: " + member.guild.memberCount)
    }
}
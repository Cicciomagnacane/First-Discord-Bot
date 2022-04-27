module.exports = {
    name: "twitch",
    description: "Send a message with my Twitch link",
    execute(object, args) 
    {
        object.channel.send("Follow me on Twitch: https://www.twitch.tv/magnacane");
    }
}
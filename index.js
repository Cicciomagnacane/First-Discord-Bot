const Discord = require("discord.js")

global.client =new Discord.Client(
    {intents:["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_VOICE_STATES"]}
)

const distube = require("./lib/music")

client.login(process.env.token)

client.on("ready", () => {
    console.log("BOT ONLINE")
})

const fs = require("fs");

client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const commandsFolder = fs.readdirSync("./commands",{withFileTypes:true}).filter(file => !file.isFile()).map(file => file.name);
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const eventsFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventsFiles) {
    const event = require(`./events/${file}`);
    if(event.type!="music")
    {
        client.on(event.name, (...args) => event.execute(...args))
    }
    else
    {
        distube.on(event.name, (...args) => event.execute(...args))
    }
}

client.on("messageCreate", message => {
    const prefix = ".";

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

    var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

    if (comando.onlyStaff) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You do not have permission to run this command")
            return
        }
    }

    comando.execute(message, args);
})
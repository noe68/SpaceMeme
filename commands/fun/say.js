const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "say", 
    category: "fun", 
    aliases: ["say", "sayit"], 
    cooldown: 2, 
    usage: "say <Text>", 
    description: "Renvoie le message", 

    run: async (client, message, args, user, text, prefix) => {
        message.channel.send(text) 
    }
}
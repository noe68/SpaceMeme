const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "avatar",
    category: "info",
    aliases: ["avatar"],
    cooldown: 2,
    usage: "avatar <@mention>",
    description: "Renvoie toutes les informations du bot discord !",

    run: async (client, message, args, user, text, prefix) => {

        user = message.mentions.members.first()
        if (user) { image = user.user.displayAvatarURL({ dynamic: true }) } else { image = message.author.displayAvatarURL({ dynamic: true }) }

        const  mentionned = message.mentions.users.first() || message.author

        const embed = new MessageEmbed()
        .setDescription(`**Avatar de : [${mentionned.username}](${mentionned.avatarURL()})**`)
        .setImage(image)
        .setColor("#2f3136")
        .setFooter('SpaceMeme', message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp()

        message.channel.send(embed)
    }
}
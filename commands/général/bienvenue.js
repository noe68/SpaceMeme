const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "bienvenue", 
    category: "général", 
    aliases: ["bienvenue", "bvn"], 
    cooldown: 2,
    usage: "bienvenue <@membre>", 
    description: "Mentionne une personne pour dire bienvenue.", 

    run: async (client, message, args,  text, prefix) => {
        const bienvenue = [
            `https://media.giphy.com/media/NYMpogVaq3M0cjTLjE/giphy.gif`,
            `https://media2.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif`
        ]
        const user = message.mentions.members.first();
        if (!user) return message.reply("Vous devez mentionner une personne !");
        const member = message.member;


        const embed = new MessageEmbed()
        .setTitle(`🖐・Bienvenue sur le server ${message.guild.name}`)
        .setDescription(`\`${member.user.username}\` te souhaite la bienvenue \`${user.user.username}\``)
        .setImage(bienvenue[Math.floor(Math.random() * bienvenue.length)])
        .setColor('#2f3136')
        .setTimestamp()
        .setFooter('SpaceMeme', message.author.displayAvatarURL({ dynamic: true}))
        message.channel.send(embed)
    }
}

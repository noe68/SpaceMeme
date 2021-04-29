const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "userinfo",
    category: "info",
    aliases: ["userinfo"],
    cooldown: 2,
    usage: "userinfo <@mention>",
    description: "Renvoie toutes les informations d'un utilisateur'",

    run: async (client, message, args, user, text, prefix) => {

        const member = message.mentions.members.last()  || message.member;
        
        const embed = new MessageEmbed()
        .setTitle('Userinfo')
        .setDescription(`**・Pseudo :** \`${member.user.username}\`
        ・**Tag :** \`${member.user.discriminator}\`
        ・**Id :**\`${member.user.id}\`
        ・**Rejoind le server :** \`${moment(member.joinedAt).format('DD/MM/YYYY')}\`
        ・**Création du compte :** \`${moment(member.user.createdAt).format('DD/MM/YYYY')}\`
        ・**Dernier message** : \`${member.user.lastMessage}\``)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true}))
        .setColor('#2f3136')
        .setTimestamp()
        .setFooter('SpaceMeme', message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed)
    }
}
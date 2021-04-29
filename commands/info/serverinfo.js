const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const verif = {
    NONE: 'Aucun',
    LOW: 'Faible',
    MEDIUM: 'Moyen',
    HIGHT: 'Elevé',
    VERY_HIGH: 'Maximun'
}

module.exports = {
    name: "serverinfo",
    category: "info",
    aliases: ["serverinfo"],
    cooldown: 2,
    usage: "serverinfo",
    description: "Renvoie toutes les informations du server",

    run: async (client, message, args, user, text, prefix) => {

        const member = message.mentions.members.last()  || message.member;

        const embed = new MessageEmbed()
        .setTitle('Serverinfo')
        .setColor('#2f3136')
        .setDescription(`・**Nom du server :** \`${message.guild.name}\`
        ・**Propriétaire :** ${message.guild.owner}
        ・**Id :** \`${message.guild.id}\`
        ・**Rejoind :** \`${moment(member.joinedAt).format('DD/MM/YYYY')}\`
        ・**Créer le :** \`${moment(message.guild.createdAt).format('DD/MM/YYYY')}\`
        ・**Boost :** \`${message.guild.premiumSubscriptionCount}\`
        ・**Règlement :** ${message.guild.rulesChannel}
        ・**Level de protection :** \`${verif[message.guild.verificationLevel]}\``)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setTimestamp()
        .setFooter('SpaceMeme', message.author.displayAvatarURL({dynamic: true}))

        message.channel.send(embed)
    }
}
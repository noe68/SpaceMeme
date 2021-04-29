const { MessageEmbed } = require('discord.js');
const {prefix} = require('../../config.json');
const pkg = require('../../package.json');
const moment = require('moment');

module.exports = {
    name: "botinfo",
    category: "info",
    aliases: ["info"],
    cooldown: 2,
    usage: "botinfo",
    description: "Renvoie toutes les informations du bot discord !",

    run: async (client, message, args, user, text, prefix) => {
        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} jour` : `\`${d.days()}\` jours`;
        const hours = (d.hours() == 1) ? `${d.hours()} heure` : `\`${d.hours()}\` heures`;
        const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `\`${d.minutes()}\` minutes`;
        const seconds = (d.seconds() == 1) ? `${d.seconds()} seconde` : `\`${d.seconds()}\` secondes`;
        const date = moment().subtract(d, 'ms').format('DD/MM/YYYY');

        const embed = new MessageEmbed();
        embed.setTitle(`Information : ${client.user.username}`)
        .setDescription(`・**Nom du bot :** \`${client.user.username}\`
        ・**Développeur :** \`Jack's Nooob#6859\`
        ・**Id :** \`${client.user.id}\`
        ・**Nombres d'utilisateur :** \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\`
        ・**Nombres de server :** \`${client.guilds.cache.size}\`
        ・**Version du bot :** \` ${pkg.version}\`
        ・**Ping : ** \`${Math.round(message.client.ws.ping)}\`ms
        ・**Uptime :** ${days} ${hours} ${minutes} ${seconds} 
        ・**Crée le :** \`${moment(message.client.user.createdTimestamp).format('DD/MM/YYYY à HH:mm:ss')}\`
        [**Invite-Moi**](https://discord.com/api/oauth2/authorize?client_id=783685429714616320&permissions=8&scope=bot)・[**ServeurSupport**](https://discord.gg/NCVHdpc)`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor('#2f3136')
        .setTimestamp()
        .setFooter('SpaceMeme', message.author.displayAvatarURL({ dynamic: true}))

        message.channel.send(embed)


    }
}
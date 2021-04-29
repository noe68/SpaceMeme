const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json");

module.exports = {
        name: "help",
        category: "info",
        aliases: ["h", "commandliste", "commandinfo"],
        cooldown: 3,
        usage: "help [Command]",
        description: "Renvoie la listes des commands disponibles !",

    run: async (client, message, args, user, text, prefix) => {
        if(args[0]){
            return getCMD(client,message,args[0]);
        }
        else{
            return getAll(client, message);
        }
    }
}

function getAll(client, message){
const embed = new MessageEmbed()
    .setColor("#2f3136")
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle(`Voici les \`${client.commands.size}\` commandes`)
    .setTimestamp()
    .setFooter(`Type: ${config.prefix}help [cmd name]`, client.user.displayAvatarURL())
    const commands = (category) => {
        return client.commands.filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``).join(", ")
    }
    const info = client.categories.map(cat => stripIndents`**__${cat[0].toUpperCase() + cat.slice(1)}__**\n> ${commands(cat)}`)
    .reduce((string, category) => string + "\n" + category);
    return message.channel.send(embed.setDescription(info))
}

function getCMD(client,message,input){
    const embed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()))
    if(!cmd){
        return message.channel.send(embed.setColor("RED").setDescription(`Aucune information trouvée pour la commande **${input.toLowerCase()}**`));
    }
    if(cmd.name) embed.addField("**・Nom**", `\`${cmd.name}\``)
    if(cmd.description) embed.addField("**・Description**", `\`${cmd.description}\``);

    if(cmd.aliases) embed.addField("**・Aliases**", `\`${cmd.aliases.map(a => `${a}`).join("\`, \`")}\``)
    if(cmd.cooldown) embed.addField("**・Cooldown**", `\`${cmd.cooldown} Seconds\``)
        else embed.addField("**Cooldown**", `\`1 Second\``)
    if(cmd.usage){
        embed.addField("**・Usage**", `\`${config.prefix}${cmd.usage}\``);
        embed.setTimestamp()
        embed.setThumbnail(client.user.displayAvatarURL())
        embed.setFooter("Syntax: <> = required, [] = optional", client.user.displayAvatarURL());
    }
    return message.channel.send(embed.setColor("#2f3136"))
}

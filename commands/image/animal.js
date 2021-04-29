const { MessageEmbed } = require('discord.js');
const got = require('got');

module.exports = {
    name: "animal",
    category: "image",
    aliases: ["animal"],
    cooldown: 4,
    usage: "animal",
    description: "Renvoie des images de animal",

    run: async (client, message, args, user, text, prefix) => {
        const embed = new MessageEmbed();
        got('https://www.reddit.com/r/aww/random/.json').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.setTitle("Oh une image de animal");
        embed.setURL(`${memeUrl}`)
        embed.setColor("#2f3136")
        embed.setImage(memeImage);
        message.channel.send(embed)
    }).catch(console.error);
    }
}
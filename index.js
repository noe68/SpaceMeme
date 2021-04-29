const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("./config.json"); 
const prefix = (config.prefix); 
const fs = require("fs"); 
const moment = require('moment');

const client = new Client({
    disableEveryone: true,  
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
}); 

client.commands = new Collection(); 
client.aliases = new Collection(); 
const cooldowns = new Collection(); 

client.categories = fs.readdirSync("./commands/"); 

["command"].forEach(handler => {
    require(`./handlers/command`)(client);
}); 
const eventhandler = require("./handlers/events"); 
eventhandler(client); 

client.on("message", async message => {

    if (message.author.bot) return;
    if (!message.guild) return; 

    if(!message.content.startsWith(prefix)&& message.content.startsWith(client.user.id)) return message.reply(embed); 
    const embed = new MessageEmbed()
    .setTitle("Korp'sBot")
    .setDescription(`Mon préfix est: **\`${prefix}\`**, type \`${prefix}help\` pour plus d'informations!`)
    .setTimestamp()
    .setFooter('Krop\'sBot', message.author.displayAvatarURL({ dynamic: true}))

    if (!message.content.startsWith(prefix)) return; 
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g); 
    const cmd = args.shift().toLowerCase(); 
    
    if (cmd.length === 0) return; 
    
    let command = client.commands.get(cmd); 
    if (!command) command = client.commands.get(client.aliases.get(cmd)); 

   
    if (command) 
    {
        if (!cooldowns.has(command.name)) { 
            cooldowns.set(command.name, new Collection());
        }
        
        const now = Date.now(); 
        const timestamps = cooldowns.get(command.name); 
        const cooldownAmount = (command.cooldown || 1) * 1000; 
      
        if (timestamps.has(message.author.id)) { 
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount; 
      
          if (now < expirationTime) { 
            const timeLeft = (expirationTime - now) / 1000; 
            const embed1 = new MessageEmbed()
            .setTitle("❌ Cooldowns")
            .setDescription(`S'il vous plaît, attendez ${timeLeft.toFixed(1)} plus de seconde (s) avant de réutiliser le \`${command.name}\` commands.`)
            .setTimestamp()
            .setFooter('Krop\'sBot', message.author.displayAvatarURL({ dynamic: true}))
            return message.reply(embed1); 
          }
        }
      
        timestamps.set(message.author.id, now); 
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); 
      try{
        command.run(client, message, args, message.author, args.join(" "), prefix); 
      }catch (error){
        console.log(error)
        const embed2 = new MessageEmbed()
        .setTitle('❌ Erreur')
        .setDescription("Une erreur s'est produite lors de l'exécution du: `" + command.name + "` command")
        .setTimestamp()
        .setFooter('Krop\'sBot', message.author.displayAvatarURL({ dynamic: true}))
        return message.reply(embed2)
      }
    } 
    else
    return message.reply(`Commande inconnue, essayez: **\`${prefix}help\`**`)
    
});

//-----------------Mentions-------------
client.on('message', async message => {
  let config = require("./config")
if (message.channel.type === "dm") return;
if (message.author.bot) return;
       
const mentionemb = new MessageEmbed()
.setTitle("Tu ma mentionner ? ")
.setDescription(`・**Salut**, je suis <@783685429714616320>
・Tu ma mentionner, si oui j'ai se qu'il te faut !
・Voici mon **prefix** : \`${prefix}\`
・J'ai \`${client.commands.size}\` commandes
・Fait \`${prefix}help\` pour savoir toute mais commandes.
・[**Invite-Moi**](https://discord.com/api/oauth2/authorize?client_id=783685429714616320&permissions=8&scope=bot)・[**ServeurSupport**](https://discord.gg/NCVHdpc)
`)
.setThumbnail(client.user.displayAvatarURL())
.setColor(`#2f3136`)
.setTimestamp()
.setFooter('Korp\'sBot', message.author.displayAvatarURL({ dynamic: true}))
if(message.mentions.users.has(client.user.id)) {message.channel.send(mentionemb);};

})
client.login(config.token); 
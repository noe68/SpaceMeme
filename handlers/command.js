const { readdirSync } = require("fs"); 
const ascii = require("ascii-table"); 

let table = new ascii("Commands"); 
table.setHeading("Command", "État des commandes ");

console.log("Vérifications de toutes les commandes !") 

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => { 
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js")); 
        for (let file of commands) { 
            let pull = require(`../commands/${dir}/${file}`); 
            if (pull.name) { 
                client.commands.set(pull.name, pull);
                table.addRow(file, 'Prêt'); 
            } else {
                table.addRow(file, `eror -> il manque un help.name, ou help.name n'est pas une chaîne.`); 
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name)); 
        }
    });
    console.log(table.toString()); 

}

const fs = require("fs"); 
const ascii = require("ascii-table"); 

let table = new ascii("Events"); 
table.setHeading("Events", "État des events");

module.exports = async (client) => {
    let theevents; 
    fs.readdirSync("./events/").forEach(file => { 
        theevents =  fs.readdirSync(`./events/`).filter(file => file.endsWith(".js")); 
        fs.readdir("./events/", (err, files) => {
            if (err) return console.error(err);
                    const event = require(`../events/${file}`); 
                    let eventName = file.split(".")[0]; 
                    theevents = eventName; 
                    client.on(eventName, event.bind(null, client)); 
            });
    });
    
    for(let i = 0; i< theevents.length; i++){
        try {
            table.addRow(theevents[i], 'Prêt'); 
        } catch (error) {
            console.error(error.stack); 
        }
    }
    console.log(table.toString()); 
	console.log("Connexion au bot ..."); 
}

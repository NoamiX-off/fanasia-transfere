const Discord = require('discord.js');
const config = require('../config.json');
const log = require(`leekslazylogger`);
module.exports = {
  name: 'clear',
  description: 'Clear des messages',
  usage: '[nombre]',
  aliases: [''],
  example: 'clear 5',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    // la commande commence ici
    message.delete()

     if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
.setColor("#FF0000")
.setDescription("Tu n'a pas la permission"))

    
    if (!args[0]) return message.channel.send(new Discord.MessageEmbed("embed1")
.setColor("#ff8c1a")
.setDescription("Indique une valeur entre 1 et 100"))
    
    message.channel.bulkDelete(args[0]).then(() => {
    
const embed3 = new Discord.MessageEmbed()
.setColor('#00ff00')
.setDescription(`**${args[0]} messages ont bien été supprimés**`) 
message.channel.send(embed3);
  
    })
  


    // la commande finit ici
  },
};

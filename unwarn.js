const Discord = require('discord.js');
const config = require('../config.json');
const log = require(`leekslazylogger`);
const fs = require('fs')
module.exports = {
  name: 'unwarn',
  description: 'Unwarn un membre',
  usage: '[@member]',
  aliases: [''],
  example: 'unwarn @member',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    // la commande commence ici
    message.delete();
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.'))
    
    const member = message.mentions.members.first()
    
    if (!member) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Veuillez mentionner le membre à unwarn.'))
    
    if (!client.db.warns[member.id]) return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription('Ce membre n\'a aucun warn.'))
    
    const warnIndex = parseInt(args[1], 10) - 1
    const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]
    if(!client.db.warns[member.id].length) delete client.db.warns[member.id]
    fs.writeFileSync('./db.json', JSON.stringify(client.db))
    
    return message.channel.send(new Discord.MessageEmbed()
.setColor("#eeeeee")
.setDescription(`${member} a été unwarn pour ${reason} !`))



    // la commande finit ici
  },
};
